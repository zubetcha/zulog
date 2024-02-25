---
title: 타입스크립트 Enum
summary: Enum이 무엇이고, 왜 유의해서 사용해야 하는지 알아보았다.
date: '2024-02-12'
draft: true
tags: ['typescript', 'enum']
images: []
---

# 들어가며

타입스크립트를 사용하면서 enum을 사용해도 괜찮을지 고민되던 시점들이 있었다. 여러 커뮤니티나 블로그에서 enum은 사용하지 않는 게 좋다는 말을 많이 봐왔기 때문에 결국 사용하지 않았지만, 분명 enum이 주는 이점들도 있을 것 같아 이 참에 어떤 방면에서 좋지 않고, 사용하기에 적합한 케이스들은 어떤 게 있는지 알고 싶어 학습 주제로 정했다.

# Enum 둘러보기

Enum은 타입스크립트가 제공하는 기능 중 하나이며, **열거형**이라고도 불린다. 자바스크립트에서는 지원하지 않지만 인터페이스를 보면 언뜻 자바스크립트의 object literal과도 비슷해 보인다. 또한 타입스크립트의 유니온 타입과도 비슷해 보인다.

## Enum의 종류

Enum은 `enum` 키워드를 사용해 정의할 수 있다. 숫자형 enum과 문자형 enum이 있으며, 하나의 enum에 숫자와 문자열을 혼합해서 사용할 수도 있다. 혼합해서 사용하는 열거형은 **이종 열거형(heterogeneous enums)**라고도 부른다.

```jsx
// 숫자형 enum
// 첫 번째 프로퍼티 초기화 O
// 다음 순서의 프로퍼티는 자동으로 1씩 증가한다.
enum Device {
  IOS = 1,
  AOS,  // 2
  WEB,  // 3
}

// 숫자형 enum
// 첫 번째 프로퍼티 초기화 X
// 다음 순서의 프로퍼티는 자동으로 1씩 증가한다.
enum Device {
  IOS,    // 0
  AOS,  // 1
  WEB,  // 2
}

// 문자형 enum
// 모든 프로퍼티가 문자열이거나 다른 문자열 enum의 프로퍼티로 초기화되어야 한다.
enum Device {
  IOS = "IOS",
  AOS = "AOS",
  WEB = "WEB",
}

// 이종 enum
// 숫자형 + 문자형 혼합
// 권장되지는 않음
enum Device {
  IOS = 0,
  AOS = "AOS",
  WEB = 2,
}
```

## Enum의 프로퍼티

Enum의 프로퍼티에 할당할 수 있는 값으로는 `상수` 와 `계산된(computed)` 값이 있다. 아래와 같은 값들을 할당할 수 있으며, **NaN**과 **Infinity**는 올 수 없다.

**상수**

- 문자 리터럴 또는 숫자 리터럴
- 이전에 정의된 다른 상수 프로퍼티에 대한 참조
- 괄호로 묶인 표현식
- `+`, `-`, `~` 와 같은 단항 연산자를 사용한 경우
- `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 와 같은 이중 연산자의 피연산자로 사용한 경우

**계산된 값**

- 상수에 해당하지 않는 경우

## 역매핑

# Enum은 실재하는 객체?!

공식문서에 따르면 enum은 런타임에 실제로 존재하는 객체이다. 따라서 값처럼 사용할 수 있다. 그래서인지 컴파일 시점의 enum 부분에 이런 설명이 있다

<aside>
💡 열거형이 런타임에 존재하는 실제 객체라고 할지라도, `keyof` 키워드는 일반적인 객체에서 기대하는 동작과 다르게 동작합니다. 대신, `keyof typeof` 를 사용하면 모든 열거형의 키를 문자열로 나타내는 타입을 가져옵니다.

</aside>

enum이 실재하는 객체인 걸 생각해보면 당연한 얘기이다. keyof 키워드는 값이 아닌 타입에만 사용할 수 있다. 따라서 keyof typeof {Enum}은 as const로 선언한 object literal의 keyof typeof와 동일하게 동작한다.

```jsx
enum Device {
  IOS = 'IOS',
  AOS = 'AOS',
  WEB = 'WEB',
}

/**
 * type DeviceKey = "IOS" | "AOS" | "WEB"
 */
type DeviceKey = keyof typeof Device

const device = {
  IOS: 'IOS',
  AOS: 'AOS',
  WEB: 'WEB',
} as const

/**
 * type DeviceKey2 = "IOS" | "AOS" | "WEB"
 */
type DeviceKey2 = keyof typeof device
```

실재하는 객체이기 때문에 값으로도, 타입으로도 사용할 수 있다는 장점이 있지만 동시에 컴파일 시 제거되지 않는다는 치명적인 단점도 있다.

타입스크립트는 **정적 타입을 검사**하는 언어이기도 하다. 정적이라는 건 반대로 동적인(=런타임) 환경에서는 검사하지 않는 의미이기도 하다. 그렇기 때문에 기본적으로 타입스크립트의 컴파일러는 정적인 환경에서 타입 검사를 마치고 나면 타입을 삭제해 버린다. 런타임에 필요하지 않은 코드들은 컴파일된 코드에 포함시킬 필요가 없기 때문이다.

그러나 실재하는 객체라면 상황이 달라진다. 실재하는 객체는 런타임 환경에서 얼마든지 변형이 이루어질 수 있기 때문에 컴파일 시 제거되어서는 안 된다. Enum은 타입스크립트의 기능임에도 불구하고 컴파일 시 제거되지 않기 때문에 번들 사이즈를 키울 수 있다.

ref.  
[Handbook - Enums](https://www.typescriptlang.org/ko/docs/handbook/enums.html)
[TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다.](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking)

