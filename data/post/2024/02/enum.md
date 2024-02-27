---
title: 타입스크립트 Enum
summary: Enum이 무엇이고, 왜 유의해서 사용해야 하는지 알아보았다.
date: '2024-02-12'
draft: false
tags: ['typescript', 'enum']
images: []
---

# 들어가며,

타입스크립트를 사용하면서 `enum`을 사용해도 괜찮을지 고민되던 시점들이 있었다. 여러 커뮤니티나 블로그에서 enum은 사용하지 않는 게 좋다는 말을 많이 봐왔기 때문에 결국 사용하지 않았지만, 분명 enum이 주는 이점들도 있을 것 같아 이 참에 어떤 방면에서 좋지 않고, 사용하기에 적합한 케이스들은 어떤 게 있는지 알고 싶어 학습 주제로 정했다.

<br/>

# Enum 둘러보기

enum은 타입스크립트가 제공하는 기능 중 하나이며, **열거형**이라고도 불린다. 자바스크립트에서는 지원하지 않지만 인터페이스를 보면 언뜻 자바스크립트의 `object literal`과도 비슷해 보인다. 또한 타입스크립트의 유니온 타입과도 비슷해 보인다.

## Enum 종류

enum은 `enum` 키워드를 사용해 정의할 수 있다. **숫자형** enum과 **문자형** enum이 있으며, 하나의 enum에 숫자와 문자열을 혼합해서 사용할 수도 있다. 혼합해서 사용하는 열거형은 **이종 열거형(heterogeneous enums)** 이라고도 부른다.

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

## Enum 프로퍼티

Enum의 프로퍼티에 할당할 수 있는 값으로는 `상수` 와 `계산된(computed) 값`이 있다. 아래와 같은 값들을 할당할 수 있으며, **NaN**과 **Infinity**는 올 수 없다.

**상수**

- 문자 리터럴 또는 숫자 리터럴
- 이전에 정의된 다른 상수 프로퍼티에 대한 참조
- 괄호로 묶인 표현식
- `+`, `-`, `~` 와 같은 단항 연산자를 사용한 경우
- `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 와 같은 이중 연산자의 피연산자로 사용한 경우

**계산된 값**

- 상수에 해당하지 않는 경우

<br/>

# Enum은 실재하는 객체?

공식문서에 따르면 enum은 런타임에 실제로 존재하는 객체이다. 따라서 값처럼 사용할 수 있다. 그래서인지 컴파일 시점의 enum에 대해서 이런 설명이 나와 있다.

> 열거형이 런타임에 존재하는 실제 객체라고 할지라도, `keyof` 키워드는 일반적인 객체에서 기대하는 동작과 다르게 동작합니다. 대신, `keyof typeof` 를 사용하면 모든 열거형의 키를 문자열로 나타내는 타입을 가져옵니다.

enum이 실재하는 객체인 걸 생각해보면 당연한 얘기이다. keyof 키워드는 값이 아닌 타입에만 사용할 수 있다. 따라서 keyof typeof Enum은 as const로 선언한 object literal의 keyof typeof와 동일하게 동작한다.

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

타입스크립트는 **정적 타입을 검사**하는 언어이다. 정적이라는 건 반대로 동적인(=런타임) 환경에서는 검사하지 않는 의미이기도 하다. 그렇기 때문에 기본적으로 타입스크립트의 컴파일러는 정적인 환경에서 타입 검사를 마치고 나면 타입을 삭제해 버린다. 런타임에 필요하지 않은 코드들은 컴파일된 코드에 포함시킬 필요가 없기 때문이다.

그러나 실재하는 객체라면 상황이 달라진다. 실재하는 객체는 런타임 환경에서 얼마든지 변형이 이루어질 수 있기 때문에 컴파일 시 제거되어서는 안 된다. 값으로도 사용할 수 있는 enum은 타입스크립트의 기능임에도 불구하고 컴파일 시 제거되지 않기 때문에 번들 사이즈에 모두 포함되고, 심지어 사용하지 않고 있더라도 대부분의 번들러가 **트리쉐이킹**하지 않는다.

## 트랜스파일 및 번들링 테스트

[참고한 블로그 글](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking)에 따르면 타입스크립트의 컴파일러는 enum을 구현하기 위해 `IIFE(즉시 실행 함수)`를 포함한 코드를 생성한다고 한다. 타입스크립트 플레이그라운드에서 확인해보니 위에서 선언한 enum이 아래와 같이 자바스크립트로 트랜스파일 되었다.

```jsx
enum Device {
  IOS = 'IOS',
  AOS = 'AOS',
  WEB = 'WEB',
}

// transpiled
var Device;
(function (Device) {
    Device["IOS"] = "IOS";
    Device["AOS"] = "AOS";
    Device["WEB"] = "WEB";
})(Device || (Device = {}));
```

위의 트랜스파일한 코드를 rollup에서 번들링 해보면 아래와 같이 번들 결과가 나온다. ([링크](https://rollupjs.org/repl/?version=2.26.11&shareable=JTdCJTIyZXhhbXBsZSUyMiUzQW51bGwlMkMlMjJtb2R1bGVzJTIyJTNBJTVCJTdCJTIyY29kZSUyMiUzQSUyMiUyRiUyRiUyMFRSRUUtU0hBS0lORyU1Q25pbXBvcnQlMjAlN0IlMjBEZXZpY2UlMjAlN0QlMjBmcm9tJTIwJy4lMkZlbnVtLmpzJyUzQiU1Q25pbXBvcnQlMjAlN0IlMjBpb3MlMjAlN0QlMjBmcm9tJTIwJy4lMkZ0cmVlLXNoYWtlZC5qcyclM0IlNUNuaW1wb3J0JTIwJTdCJTIwYW9zJTIwJTdEJTIwZnJvbSUyMCcuJTJGbm90LXRyZWUtc2hha2VkLmpzJyUzQiU1Q24lNUNuY29uc29sZS5sb2coaW9zKSUzQiU1Q24lMjIlMkMlMjJpc0VudHJ5JTIyJTNBdHJ1ZSUyQyUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTdEJTJDJTdCJTIyY29kZSUyMiUzQSUyMmV4cG9ydCUyMHZhciUyMERldmljZSUzQiU1Q24oZnVuY3Rpb24lMjAoRGV2aWNlKSUyMCU3QiU1Q24lMjAlMjAlMjAlMjBEZXZpY2UlNUIlNUMlMjJJT1MlNUMlMjIlNUQlMjAlM0QlMjAlNUMlMjJJT1MlNUMlMjIlM0IlNUNuJTIwJTIwJTIwJTIwRGV2aWNlJTVCJTVDJTIyQU9TJTVDJTIyJTVEJTIwJTNEJTIwJTVDJTIyQU9TJTVDJTIyJTNCJTVDbiUyMCUyMCUyMCUyMERldmljZSU1QiU1QyUyMldFQiU1QyUyMiU1RCUyMCUzRCUyMCU1QyUyMldFQiU1QyUyMiUzQiU1Q24lN0QpKERldmljZSUyMCU3QyU3QyUyMChEZXZpY2UlMjAlM0QlMjAlN0IlN0QpKSUzQiU1Q24lNUNuJTIyJTJDJTIyaXNFbnRyeSUyMiUzQWZhbHNlJTJDJTIybmFtZSUyMiUzQSUyMmVudW0uanMlMjIlN0QlMkMlN0IlMjJjb2RlJTIyJTNBJTIyZXhwb3J0JTIwdmFyJTIwaW9zJTIwJTNEJTIwJ0lPUyclM0IlMjIlMkMlMjJpc0VudHJ5JTIyJTNBZmFsc2UlMkMlMjJuYW1lJTIyJTNBJTIydHJlZS1zaGFrZWQuanMlMjIlN0QlMkMlN0IlMjJjb2RlJTIyJTNBJTIyZXhwb3J0JTIwdmFyJTIwYW9zJTIwJTNEJTIwJ0FPUyclM0IlMjIlMkMlMjJpc0VudHJ5JTIyJTNBZmFsc2UlMkMlMjJuYW1lJTIyJTNBJTIybm90LXRyZWUtc2hha2VkLmpzJTIyJTdEJTVEJTJDJTIyb3B0aW9ucyUyMiUzQSU3QiUyMm91dHB1dCUyMiUzQSU3QiUyMmZvcm1hdCUyMiUzQSUyMmVzJTIyJTdEJTJDJTIydHJlZXNoYWtlJTIyJTNBdHJ1ZSU3RCU3RA==))

```jsx
// 테스트를 위해 분리해놓은 모듈들

// main.js
// TREE-SHAKING
import { Device } from './enum.js'
import { ios } from './tree-shaked.js'
import { aos } from './not-tree-shaked.js'

console.log(ios)

// enum.js
export var Device
;(function (Device) {
  Device['IOS'] = 'IOS'
  Device['AOS'] = 'AOS'
  Device['WEB'] = 'WEB'
})(Device || (Device = {}))

// tree-shaked.js
export var ios = 'IOS'

// not-tree-shaked.js
export var aos = 'AOS'
```

```jsx
// 번들 결과
var Device
;(function (Device) {
  Device['IOS'] = 'IOS'
  Device['AOS'] = 'AOS'
  Device['WEB'] = 'WEB'
})(Device || (Device = {}))

var ios = 'IOS'

// TREE-SHAKING

console.log(ios)
```

`export` 및 `import` 되었지만 실제로 사용되고 있지 않은 변수인 aos는 번들 결과에 포함되지 않았지만 console.log에 사용한 ios는 번들 결과에 포함되어 있다. 여기까지는 우리가 알고 있는 트리쉐이킹의 동작이다. 그런데 enum으로 선언한 Device 또한 export 및 import는 되었지만 어디에도 사용되고 있지 않음에도 불구하고 번들 결과에 포함되어 있는 것을 확인할 수 있다.

방대한 규모의 프로젝트에 일일히 선언한 enum이 사용되고 있는지 확인하는 일은 꽤나 비효율적이고 불필요할 것이다.

## 몇 가지 대안

### const enum

타입스크립트에서는 위의 불필요하게 코드가 생성되는 문제점에 대한 해결책으로 `const enum`을 제시하고 있다. const enum으로 선언한 enum은 컴파일 과정에서 완전히 제거된다. 단, 컴파일 과정에서 제거되기 위해서는 enum에 동적인 값을 사용하면 안 되기 때문에 **계산된 값**이 아닌 **상수** 프로퍼티만 가지고 있어야 한다.

```jsx
const enum Device {
  IOS = 'IOS',
  AOS = 'AOS',
  WEB = 'WEB',
}

const devices = [
	Device.IOS,
	Device.AOS,
	Device.WEB
]
```

```jsx
// transpiled
// const enum은 enum과 달리 즉시실행함수로 트랜스파일되지 않는다.
const devices = ['IOS' /* Device.IOS */, 'AOS' /* Device.AOS */, 'WEB' /* Device.WEB */]
```

### union type

두 번째 방법은 `유니온 타입`을 사용하는 것이다. 유니온 타입을 사용하면 마찬가지로 자바스크립트로 트랜스파일할 때 IIFE(즉시실행함수)를 생성하지 않기 때문에 번들에 포함되지 않는다. 값을 사용할 때는 원래 사용하던 객체의 형태로 사용하면서 타입의 편리함까지 그대로 누릴 수 있다.

```jsx
const DEVICE = {
	IOS: 'IOS',
	AOS: 'AOS',
	WEB: 'WEB'
} as const

// type Device = "IOS" | "AOS" | "WEB"
type Device = typeof DEVICE[keyof typeof DEVICE]
```

```jsx
// transpiled
const DEVICE = {
  IOS: 'IOS',
  AOS: 'AOS',
  WEB: 'WEB',
}
```

<br/>

# 마치며.

enum의 특징만 보면 장점도 분명히 존재하는 기능이라는 생각이 든다. 값과 타입으로 동시에 사용할 수 있다니! 매번 값에 사용할 타입들을 정성스레 만드는 수고는 덜 수 있을지도 모르겠다는 생각이 들었다. 그런데 수고로움을 덜기 위해 enum으로부터 생성되는 코드들이 번들에 포함되는 건 치명적인 단점인 것 같다. 사실상 트레이드 오프 관계로 보는 것도 어렵지 않을까?

그나저나 enum을 공부하다보니 컴파일, 트랜스파일, 번들링 툴에 대해서 더 궁금해졌다는 후문..🧐

<br/>

**ref.**  
[Handbook - Enums](https://www.typescriptlang.org/ko/docs/handbook/enums.html)  
[TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다.](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking)
