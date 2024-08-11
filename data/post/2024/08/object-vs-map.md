---
title: 'Map은 정말 Object Literal보다 성능이 좋을까?'
summary:
date: '2024-08-09'
draft: true
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

> 프로퍼티 삭제가 빈번하게 일어날 수 있는 경우에는 Map/Set을 사용하도록 하자🙂

<br/>

# Map

# hashmap

# 마치며.
