---
title: 타입스크립트 Enum
summary: Enum이 무엇이고, 왜 유의해서 사용해야 하는지 알아보았다.
date: '2024-02-12'
draft: true
tags: ['typescript', 'enum']
images: []
---

# 들어가며

타입스크립트를 사용하면서 enum을 사용해도 괜찮을지 고민되던 시점들이 있었다. 여러 커뮤니티나 블로그에서 enum은 사용하지 않는 게 좋다는 말을 많이 봐왔기 때문에 결국 사용하지 않았지만, 분명 enum이 주는 이점들도 있을 것 같아 이 참에 어떤 방면에서 좋지 않고, 사용하기에 적합한 케이스들은 어떤 게 있는지 알고 싶어서 주제로 정했다.

# Enum 둘러보기

Enum은 타입스크립트가 제공하는 기능 중 하나이며, 열거형이라고도 불린다. 자바스크립트에서는 지원하지 않지만 인터페이스를 보면 언뜻 자바스크립트의 object literal과도 비슷해 보인다.

## Enum의 종류

Enum은 `enum` 키워드를 사용해 정의할 수 있다. 숫자형 enum과 문자형 enum으로 나뉘며, 하나의 enum에 숫자와 문자열을 혼합해서 사용할 수도 있다.

```jsx
// 숫자형 enum
// 첫 번째 프로퍼티 초기화 O
// 다음 순서의 프로퍼티는 자동으로 1씩 증가한다.
enum Direction {
  Up = 1,
  Down,  // 2
  Left,  // 3
  Right, // 4
}

// 숫자형 enum
// 첫 번째 프로퍼티 초기화 X
// 다음 순서의 프로퍼티는 자동으로 1씩 증가한다.
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

// 문자형 enum
// 모든 프로퍼티가 문자열이거나 다른 문자열 enum의 프로퍼티로 초기화되어야 한다.
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// 이종 enum
// 숫자형 + 문자형 혼합
// 권장되지는 않음
enum Direction {
  Up = 0,
  Down = "DOWN",
  Left = 2,
  Right = "RIGHT",
}
```

## Enum의 프로퍼티

Enum의 프로퍼티에 할당할 수 있는 값으로는 크게 `상수` 값과 `계산된(computed)` 값이 있다.

## 환경에서의 Enum

## 컴파일

## 런타임

# Enums의 단점

# 내가 생각하는 Enum의 장점

### 숫자형 enum의 역방향 매핑

- 자바스크립트의 object literal로 트랜스파일되지만 순서가 보장됨

ref.  
[Handbook - Enums](https://www.typescriptlang.org/ko/docs/handbook/enums.html)
