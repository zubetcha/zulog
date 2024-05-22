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
