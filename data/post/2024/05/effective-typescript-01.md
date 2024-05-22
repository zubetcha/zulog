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
