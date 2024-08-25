---
title: 'Map은 정말 Object Literal보다 성능이 좋을까?'
summary:
date: '2024-08-09'
draft: false
tags: ['javascript']
images: []
---

# 들어가며,

며칠 전 프로그래머스에서 문제를 풀던 중 신기한 현상(?)을 발견했다.

hashmap을 이용해서 풀어야 하는 문제였는데 key-value 구조를 떠올렸을 때 가장 먼저 생각난 게 `Object Literal`(우리가 흔히 중괄호로 쓰는 그 객체)였기 때문에 적용해서 제출했으나 시간 초과로 실패하고 말았다. 그런데 로직은 그대로 남겨두고 Object Literal을 `Map` 객체로 바꿨더니 시간 초과가 뜨지 않고 잘 통과했다.

Object Literal이 Map 객체에 비해서 이렇게 성능이 떨어지나? 문제를 풀 때 말고 실제로 회사에서 프로그래밍을 할 때에도 Object Literal과 Map을 적재적소에 잘 사용하고 있나? 하는 반성이 들어서 찾아보았다!

> `hashmap`  
> 자료구조 중 하나로, key-value 쌍을 저장한다. key는 고유해야 하며, key를 사용해 값에 빠르게 접근할 수 있다.

<br/>

# Object Literal

[Object Literal](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)은 중괄호로 표현하는 데이터 구조이다. key-value 형태로 되어 있어 특정 키에 원하는 값을 저장하고, 접근해서 사용할 수 있다. Object Literal의 몇 가지 특징을 나열해보면,

- `non-iterable` 하다. 즉, 직접적으로는 반복 작업을 할 수 없다. Object.keys(), Object.entries(), for...in 등으로 우회하는 방법으로는 가능하다.

```javascript
const obj = { a: 1, b: 2 }

Object.keys(obj) // ['a', 'b']
Object.entries(obj) // [['a', 1], ['b', 2]]
```

- key로 사용할 수 있는 데이터 타입이 `String`과 `Symbol` 뿐이다.
- 아이템 수를 직접 확인할 수 없다. Object.keys() 등을 통해 간접적으로는 확인이 가능하다.

```javascript
const obj = { a: 1, b: 2 }
const size = Object.keys(obj).length // 2
```

- `직렬화`와 `구문 분석(역직렬화)`를 지원한다. JSON.stringify()와 JSON.parse()를 통해 가능하다.

```javascript
const obj = { a: 1, b: 2 }

const stringified = JSON.stringify(obj) // '{"a":1,"b":2}'
const parsed = JSON.parse(stringified) // {a: 1, b: 2}
```

- 프로퍼티를 삭제하는 메서드는 지원하지 않으며, 삭제하기 위해서는 `delete` 연산자를 사용해야 한다.

```javascript
const obj = { a: 1, b: 2 }

delete obj.a
console.log(obj) // {b: 2}
```

<br/>

## delete 연산자의 slow delete 문제

위의 특징에서 살펴봤듯이 Object Literal의 프로퍼티를 삭제하기 위해서는 `delete` 연산자를 사용해야만 한다. 그런데 delete 연산자는 Map 객체의 delete 메서드에 비해, 사이즈가 커질수록 성능이 더 안 좋아진다고 한다. 이 문제와 관련된 논의는 [여기](https://stackoverflow.com/questions/43594092/slow-delete-of-object-properties-in-js-in-v8)에서 확인해 볼 수 있다.

간단하게 말하면, 프로퍼티의 개수가 많을수록 delete 연산자를 통해 프로퍼티를 삭제하는 데 걸리는 시간이 Map의 delete 메서드에 비해 훨씬 더 늘어난다는 것이다. 위의 스택오버플로우에 따르면 node 버전에 따라서 달라지지만 특정 개수가 넘어가면 급격히 느려지는 양상을 보인다고 한다.

```javascript
// node v20
const N0 = 50856

function fast() {
  const N = N0

  const o = {}
  for (let i = 0; i < N; i++) {
    o[i] = i
  }

  const t1 = Date.now()
  for (let i = 0; i < N; i++) {
    delete o[i]
  }
  const t2 = Date.now()

  console.log(N / (t2 - t1) + ' KOP/S')
}

function slow() {
  const N = N0 + 1 // adding just 1

  const o = {}
  for (let i = 0; i < N; i++) {
    o[i] = i
  }

  const t1 = Date.now()
  for (let i = 0; i < N; i++) {
    delete o[i]
  }
  const t2 = Date.now()

  console.log(N / (t2 - t1) + ' KOP/S')
}

fast()
slow()
```

위 링크를 보면 V8 엔진 개발자가 직접 코멘트를 작성한 걸 볼 수 있는데, V8 개발자에 따르면 delete 연산이 일어날 때마다 삭제 작업을 위해 flat array에서 dictionary로 전환하기 위한 요소가 실제로 존재하는지 검사하는데, 이 검사하는 작업은 아이템 수가 많아질수록 더 오랜 시간이 소요됐었다고 한다. 이 문제를 해결하기 위해 특정 크기 이하의 객체에서는 검사하는 작업을 스킵하도록 최적화 했는데, 이 영향이 스택오버플로우의 테스트에서 확인된 것으로 보인다고 한다.

2017년도 글이므로, 추후에는 특정 크기로 확인하는 게 아닌 가끔씩만 확인하는 것으로 수정하여 적용할 예정이라고 되어 있는데 실제로 내가 현재 사용중인 v20에서는 fast와 slow 함수를 실행할 때마다 속도가 달라지고, 더 빠른 케이스도 달라지는 걸 확인할 수 있었다.

추가적인 코멘트로, 가능하면 delete 연산자는 사용하지 않고 ES6의 Map/Set을 사용하는 것을 권장하고 있다. delete 연산자는 V8 엔진이 더 많은 검사를 수행하도록 하고, 빠른 경로에서 벗어나는 경우도 생길 수 있기 때문에 다양한 상황에서 속도 저하가 일어날 수 있다고 한다!

> 프로퍼티 삭제가 빈번하게 일어날 수 있는 경우에는 `Map/Set`을 사용하도록 하자🙂

<br/>

## 객체 주입 공격 문제

Object Literal의 두 번째 문제점은 프로퍼티 보안(?)에 취약하다는 것이다.

보통 객체의 프로퍼티나 메서드에 접근할 때 `점(.)`이나 `대괄호([])`를 사용한다. 이러한 접근 방식은 아래와 같은 문제들을 야기할 수 있다고 한다.

<br/>

### 1. 객체의 모든 프로퍼티에 접근이 가능하다.

```javascript
exampleClass[userInput[0]] = userInput[1]
```

만약 exampleClass의 userInput[0] 키에 민감한 정보가 할당되어 있었다 하더라도 위의 코드로 인해 값인 수정될 것이다.

<br/>

### 2. 프로토타입의 프로퍼티를 포함한 모든 프로퍼티에 접근이 가능하다.

```javascript
userInput = ['constructor', '{}']
exampleClass[userInput[0]] = userInput[1]
```

위의 코드는 일반적으로 쓰이는 패턴은 아니지만, 어찌 됐든 위와 같은 방식으로 프로토타입에도 접근하거나 값을 덮어쓸 수 있다.
프로토타입의 `constructor` 프로퍼티는 원시 값에 대해서만 읽기 전용이기 때문에 원시 값이 아닌 경우 값을 덮어쓰게 되어 추후 예기치 못한 문제를 야기할 수 있다.

---

사실 위와 같이 작성하는 패턴은 Javascript에서 흔하게 다루는 방식이 아니기 때문에 쉽게 발생할 수 있는 문제는 아니지만 알아둬서 나쁠 건 없을 것 같다. 참고한 곳에서도 이 문제가 쉽게 발생하지 않는 이유는, 이렇게 작성하는 방식이 위험하다고 알려져 있기 때문이 아니라 작성 방식 자체가 흔하지 않아 학습되어 있지 않기 때문이라고 있다.

<br/>

# Map

[Map](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map)은 ES6에서 추가된 key-value 형태의 데이터를 저장하는 객체이다. key-value 쌍을 저장한다는 점에 있어서 Object Literal과 유사하지만 다른 점이 많다. Map의 특징들을 알아보면,

- Map은 순회 동작이 내장되어 있는 `iterable`한 객체이다.
- 데이터를 삽입한 순서를 보장한다.
- key에 모든 데이터 타입 사용이 가능하다.
- 어아탬 개수를 바로 확인할 수 있는 프로퍼티(`size`)를 지원한다.
- 직렬화 및 구문 분석은 지원하지 않는다. 다만, [replacer](https://embed.plnkr.co/oNlQQBDyJUiIQlgWUPVP/) 방식으로 우회해서 사용할 수는 있다.
- 프로퍼티를 삽입할 때 전용 메서드인 `set`을 사용해야 한다.
  - Object Literal의 방식도 동작하긴 하나 Map의 데이터 구조와 맞지 않게 설정되기 때문에 주의해야 한다.
  - 아래 예시 코드와 같이 프로퍼티 설정은 된 것 처럼 보이나 has, delete 등의 내장 메서드가 제대로 동작하지 않는다.

```javascript
const wrongMap = new Map()
wrongMap['a'] = 'a'
wrongMap['b'] = 'b'

console.log(wrongMap) // Map { a: 'a', b: 'b' }
wrongMap.has('a') // false
wrongMap.delete('a') // false
console.log(wrongMap) // Map { a: 'a', b: 'b' }
```

<br/>

# HashMap으로 어떤 걸 사용해야 할까?

결론부터 말하자면 HashMap을 활용해야 할 때에는 Object Literal보다 `Map`을 사용하는 게 더 적합하다.
`HashMap`은 해싱 함수를 이용해 중복이 허용되지 않는 key에 매칭되는 인덱스를 부여하여 값에 빠르게 접근할 수 있도록 하는 자료구조를 의미하며, 아래와 같은 특징을 가지고 있다.

- key-value 쌍의 데이터를 저장한다.
- value의 중복은 허용하지만 key의 중복은 허용하지 않는다.
- null 값을 key로도 사용할 수 있다.
- 검색, 삽입, 삭제 연산에서 O(1)의 시간 복잡도를 가진다. (빠른 성능)

따라서 데이터 접근이 빈번하게 발생하거나 대용량의 데이터를 처리해야 하는 경우에는 HashMap을 사용해야 하는데, Object Literal의 1) key에 사용할 수 있는 데이터 타입이 제한적인 점, 2) 프로퍼티의 개수를 빠르게 알기 어려운 점, 3) 프로퍼티 삭제 연산이 느린 점, 4) 프로퍼티 유무를 확인하는 데 한계가 있는 점과 같은 제약사항들로 인해 Object Literal 보다는 Map 객체를 사용하는 것이 더 권장되는 것 같다.

Map은 Object Literal에 비해서 메모리도 적게 소비한다. Object Literal에서는 프로퍼티를 설정할 때 key-value 외에도 **configurage, writable, enumerable** 등와 같은 [property descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)라는 추가적인 정보들을 함께 저장한다. 값만 저장하는 Map에 비해 당연히 공간을 더 많이 차지할 수밖에 없다.

속도도 속도지만 4) 프로퍼티 유무를 확인하는 데 한계가 있다는 점과 유저 정의 프로퍼티/빌트인 프로퍼티를 분리해서 확인할 수 없다는 점이 key-value를 저장하는 데이터 구조로서 치명적인 단점이 아닐까 하는 생각이 든다.

4)의 경우 아래와 같은 상황인데, value에 undefined를 할당한 후 .이나 []로 접근했을 때 존재하는 프로퍼티인지, 존재하지 않는 프로퍼티인지 알기 어렵다.

```javascript
const obj = { a: undefined }

obj.a // undefined
obj['a'] // undefined
```

이 때에는 Object.prototype.hasOwnProperty나 Object.hasOwn을 사용해서 별도로 존재 여부를 확인해야 한다.

```javascript
Object.hasOwn(obj, 'a') // true
```

또한, Object Literal은 .으로 접근하면 사용자가 직접 정의한 프로퍼티 외에도 Object의 빌트인 프로퍼티나 메서드에도 접근이 가능하다. 그러나 Map은 get 메서드를 사용하면 사용자가 정의한 프로퍼티만 가져올 수 있다. 데이터에 접근하는 방식 관점에서 볼 때에도 HashMap으로서는 Object Literal보다 Map을 사용하는 게 더 적절해 보인다.

<br/>

# 마치며.

지금까지 Map과 Object Literal에 대해서 제대로 알지 못하고 혼용해서 사용했었다. 단순히 Map이 Object Literal을 대체하는 새로운 객체..? 정도로만 생각했었는데 이번 기회에 두 객체에 대한 차이점도 알게 되고 어떤 상황에서 사용해야 하는지 조금이나마 공부가 되었다.

`Map`

- 런타임에서 데이터 조작이 빈번하게 발생하는 경우
- key에 다양한 데이터 타입을 설정해야 하는 경우
- 삽입 순서가 보장되어야 하는 경우
- 비슷한 맥락으로 loop를 해야 하는 경우

`Object Literal`

- 직렬화 및 역직렬화가 필요한 경우
- 프로퍼티 수가 한정적이고 거의 변하지 않는 경우
- 컴파일 시점에 데이터가 고정되어 있는 경우 (ex. 상수 등)

<br/>

ref.

- [https://stackoverflow.com/questions/43594092/slow-delete-of-object-properties-in-js-in-v8](https://stackoverflow.com/questions/43594092/slow-delete-of-object-properties-in-js-in-v8)
- [https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md](https://github.com/eslint-community/eslint-plugin-security/blob/main/docs/the-dangers-of-square-bracket-notation.md)
- [https://velog.io/@kms403/%ED%95%B4%EC%8B%9C%EB%A7%B5HashMap](https://velog.io/@kms403/%ED%95%B4%EC%8B%9C%EB%A7%B5HashMap)
