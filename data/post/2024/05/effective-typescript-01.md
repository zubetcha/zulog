---
title: '[이펙티브 타입스크립트] 1장. 타입스크립트 알아보기'
summary:
date: '2024-05-15'
draft: true
tags: ['book', 'typescript']
images: []
---

# 1장. 타입스크립트 알아보기

- 타입스크립트는 자바스크립트로 컴파일됨
- 타입스크립트는 자바스크립트로 실행됨

## 타입스크립트와 자바스크립트의 관계 이해하기

- 타입스크립트는 자바스크립트의 상위 집합
- 모든 자바스크립트는 타입스크립트이지만, 모든 타입스크립트가 자바스크립트인 건 아님
- 타입 구문을 사용하면 코드의 의도를 명확히 할 수 있고, 이를 통해 타입 시스팀이 오류가 발생할 수 있는 부분에 대해 올바른 해결책을 제시할 수 있음
- 타입스크립트의 타입 시스템은 자바스크립트의 런타임 동작을 모델링함
- 타입 체크를 통과하더라도 런타임 오류는 발생할 수 있음

```javascript
const names = ['Alice', 'Bob']
console.log(names[2].toUpperCase()) // TypeError: Cannot read property 'toUpperCase' of undefined
```

## 타입스크립트 설정 이해하기

### noImplicitAny

- 타입을 명시적으로 설정하지 않아도 되는지를 확인하는 설정
- true: 타입을 설정하지 않고 암시적으로 any로 추론되는 경우 타입 에러 발생
- false: 타입을 설정하지 않아도 암시적인 any 타입 추론을 허용

```typescript
// noImplicitAny true -> 타입 에러
// noImplicitAny false -> OK
function sum(a, b) {
  return a + b
}

// noImplicitAny true -> OK
function sum(a: number, b: number) {
  return a + b
}
```

### strictNullChecks

- 모든 타입에 null과 undefined가 허용되는지 확인하는 설정

```typescript
// strictNullChecks true -> 타입 에러
// strictNullChecks false -> OK
const a: number = null

// strictNullChecks true -> OK
const a: number | null = null
```

## 코드 생성과 타입이 관계 없음을 이해하기

타입스크립트 컴파일러의 역할 두 가지

1. 최신 타입스크립트/자바스크립트가 브라우저에서 동작할 수 있도록 호환 가능한 버전의 자바스크립트로 트랜스파일
2. 코드의 타입 오류 체크

알아두면 좋을 몇 가지

- 타입 오류가 있는 코드도 컴파일 가능
  - `noEmitOnError`를 통해 오류가 있는 경우 컴파일하지 않도록 설정 가능
- 런타임에는 타입 체크 불가능
- 타입 연산은 런타임에 영향을 주지 않음
- 타입스크립트 타입으로 함수를 오버로드할 수 없음
- 타입스크립트 타입은 런타임 성능에 영향을 주지 않음

## 구조적 타이핑에 익숙해지기

- 자바스크립트는 본질적으로 덕 타이핑(duck typing) 기반
  - 덕 타이핑: 객체가 어떤 타입에 부합하는 변수와 메서드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식

#### 구조적 타이핑 예시

```typescript
interface Vertor2D {
  x: number
  y: number
}

function calclulateLength(v: Vertor2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface NamedVertor {
  name: string
  x: number
  y: number
}

const v: NamedVector = { x: 2, y: 4, name: 'Z33' }
calculateLength(v) // 정상
```

- Vector2D와 NamedVector의 관계를 선언하지 않아도 NamedVertor는 number타입의 x와 y 프로퍼티를 가지고 있기 때문에 caculateLength 함수로 호출 가능
- NamedVector를 위한 별도의 calculateLength를 구현할 필요 또한 없음
- **Vector2D와 NamedVector의 구조가 호환되기 때문** (`구조적 타이핑`)

#### 구조적 타이핑 문제 예시

```typescript
interface Vector3D {
  x: number
  y: number
  z: number
}

// 벡터의 길이를 1로 만드는 정규화 함수
function normalize(v: Vector3D) {
  const length = calculateLength(v)
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  }
}

normalize({ x: 3, y: 4, z: 5 }) // { x: 0.6, y: 0.8, z: 1 }
```

- 정규화 함수는 기대값 1보다 큰 1.41 길이를 반환
- calculateLength 함수는 2D 벡터를 기반으로 연산하지만 정규화 함수에서는 3D 벡터 기바으로 연산한 것이 버그
- 그러나 구조적 타이핑의 문제로 타입 체커는 문제를 인식하지 못함
  - 구조적 타이핑 관점에서는 Vector3D에 x와 y가 존재하기 때문에 Vector2D와 호환 가능하다고 인식
- 즉, 함수를 호출할 때 매개변수에 선언되어 있는 속성을 가지고 있고 그 외 다른 속성을 추가적으로 가지고 있어도 호출이 가능함

#### 클래스 할당과 관련된 문제 예시

```typescript
class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
}

const c = new C('instance of C')
const d: C = { foo: 'object literal' } // 정상
```

- 변수 d는 string 타입의 foo 프로퍼티와 하나의 매개변수로 호출되는 생성자 프로퍼티를 가짐
- 구조적으로 봤을 때에는 인스턴스 C에 필요한 속성과 생성자가 존재하기 때문에 문제가 없는 것으로 인식
- 만약, 생성자 함수에 단순 할당이 아닌 연산 로직이 존재했다면 d는 생성자를 실행시키지 않으므로 문제가 발생

#### 요약

- 자바스크립트는 duck typing 기반이며, 타입스크립트는 이를 모델링하기 위해 구조적 타이핑을 사용함
- 클래스 또한 구조적 타이핑 규칙을 따름

<br/>

## 5. any 타입 지양하기

```typescript
let age: number
age = '12' // Error: '12'는 number 타입에 할당할 수 없음
age = '12' as any // OK
```

#### any 타입에는 타입 안정성이 없다.

- as any 타입 단언을 사용하면 선언한 타입 외의 타입을 할당할 수 있게 됨
- 그러나 타입 체커는 선언에 따라 number 타입으로 판단

```typescript
age += 1 // 런타임에서는 정상이나 값이 "121"이 됨
```

#### any는 함수 시그니처를 무시한다.

- 함수 시그니처: 약속된 타입의 입력을 제공, 약속된 타입의 출력을 반환
- any를 사용하면 위와 같은 약속을 어길 수 있게 됨
- 자바스크립트에서는 암시적으로 타입을 변환할 수도 있어 런타임에서 오류 없이 실행될 수도 있기 때문에 원치 않는 결과를 일으킬 수도 있음
  - ex. string 타입과 number 타입의 연산

#### any 타입에는 언어 서비스가 적용되지 않는다.

- any를 사용하면 자동완성 기능과 도움말 제공을 사용할 수 없음
- 한 번에 이름을 변경해주는 Rename Symbol 기능을 사용할 수 없음

#### any 타입은 코드 리팩토링 때 버그를 감춘다.

- any 타입을 사용하면 사용하는 데이터의 규격을 변경하는 리팩토링을 할 경우 타입 체크는 통과하지만 런타임에러는 에러가 발생할 수 있음

#### any는 타입 설계를 감춘다.

- 특히 어플리케이션의 상태 같은 객체를 정의할 때 any를 사용하면 설계가 잘 되었는지, 설계가 어떻게 되었는지 알 수 없음
- 다소 귀찮더라도 타입 설계가 명확히 보이도록 일일이 타입을 정의해주는 게 좋음

#### any는 타입 시스템의 신뢰도를 떨어뜨린다.

- 정적 환경에서 타입 체크를 통과하더라도 런타임에러 에러가 발생한다면 타입 체커를 점점 더 신뢰할 수 없게 될 것
- 런타임에 발생할 수 있는 오류들을 타입 체커에서 먼저 확인할 수 있도록 any 타입 사용은 지양하는 것이 좋음
