---
title: '[이펙티브 타입스크립트] 2장. 타입스크립트의 타입 시스템'
summary:
date: '2024-09-18'
draft: true
tags: ['book', 'typescript']
images: []
---

## 1. 편집기를 사용하여 타입 시스템 탐색하기

- 편집기에서 타입 시스템이 어떻게 타입을 추론하는지 살펴볼 수 있음
  - 숫자, 함수, 객체의 프로퍼티, 조건문 분기 안에서의 값 등
- 에디터에서 Go to Definition 기능을 통해 라이브러리 또는 라이브러리 타입 선언 탐색 가능
  - 타입스크립트 선언 파일을 찾다보면 어떻게 동작을 모델링하는지 알 수 있음

### 에디터상의 타입 오류

```tsx
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
	if (typeof elOrId === 'object') {
		return elOrId; // 타입에러 1
	} else if (elOrId === null) {
		return document.body;
	} else {
		const el = document.getElementById(elOrId);
		return el // 타입에러 2
}
```

- 타입에러 1: 타입스크립트에서 null의 타입도 `object`이므로, null은 함수의 반환 타입인 HTMLElement에 할당이 안 되므로 타입 오류 발생
- 타입에러 2: getElementById 함수의 반환값의 타입은 `HTMLElement | null`이므로, 마찬가지로 null은 함수의 반환 타입인 HTMLElement에 할당이 안 되므로 타입 오류 발생

## 2. 타입이 값들의 집합이라고 생각하기

- 타입은 할당 가능한 값들의 집합 혹은 범위
  - ex. `number` 타입은 모든 숫자값의 집합
- null과 undefined는 strictNullChecks 여부에 따라 number에 해당될 수도, 아닐 수도 있음
- 가장 작은 집합 → 아무 값도 포함되지 않는 공집합 → 타입스크립트에서는 `never` 타입
  - never 타입으로 선언된 변수의 범위는 공집합이기 때문에 아무런 값도 할당할 수 없음

```tsx
const x: never = 12
// 타입에러: never 타입에 12 할당 불가
```

- 그 다음으로 작은 집합: `유닛(unit) 타입` 또는 `리터럴(literal) 타입`

```tsx
type A = 'A'
type Two = 2
```

- 유닛 혹은 리터럴 타입을 2개 이상으로 묶은 타입 → `유니온(union) 타입`
  - 값 집합들의 **합집합**

```tsx
type AB = 'A' | 'B'
type AB12 = 'A' | 'B' | 12
```

### 할당 가능 여부 판단

- 할당하려는 값의 타입이 타입 집합의 `원소` 혹은 `부분 집합`인지 확인
- 원소 혹은 부분 집합이 아닌 경우 할당 불가

```tsx
type a: AB = 'A'; // 정상
type c: AB = 'C'; // 타입 에러
```

- 어떠한 객체가 string으로 할당 가능한 id 프로퍼티를 가지고 있다면 그 객체는 Identified
- 구조적 타이핑 규칙은 어떠한 값이 다른 속성도 가질 수 있음을 의미함

```jsx
interface Identified {
	id: string;
}
```

- 인터섹션(&) 타입 (교집합)
- Person과 Lifespan 타입은 공통으로 가지는 속성이 없기 때문에 PersonSpan 타입인 never으로 추론될 것 같지만 실제로는 아님
- & 같은 타입 연산자는 인터페이스의 속성이 아닌, **값의 집합(타입의 범위)**에 적용됨 → 각 타입의 속성을 모두 포함
- 결과적으로 PersonSpan은 Person과 Lifespan의 속성을 모두 가지는 타입이 됨

```tsx
interface Person {
  name: string
}
interface Lifespan {
  birth: Date
  death?: Date
}
type PersonSpan = Person & Lifespan

const ps: PersonSpan = {
  name: 'name',
  birth: new Date(''),
  death: new Date(''),
} // 정상
```

- 유니온(|) 타입

```tsx
type K = keyof (Person | Lifespan) // K는 공집합 never
```

```tsx
keyof (A&B) = (keyof A) | (keyof B);
keyof (A|B) = (keyof A) & (keyof B);

keyof (Person&Lifespan) = 'name' | 'birth' | 'death';
keyof (Person|Lifespan) = 'name' & 'birth' | 'death' -> 'name'과 'birth' | 'death' 에는 공통된 값이 없으므로 never;

type A = keyof Person & keyof Lifespan // never
type AA = keyof (Person | Lifespan) // never

type B = keyof Person | keyof Lifespan // 'name' | 'birth' | 'death'
type BB = keyof (Person & Lifespan) // 'name' | 'birth' | 'death'
```

- 배열과 튜플 관계
- 부분 집합의 관점에서 생각해보기

```tsx
const numArray = [1, 2] // number[];
const numTuple: [number, number] = numArray // 할당 불가 에러 -> number[]는 [number, number]의 부분 집합이 아님

const numTuple: [number, number] = [1, 2]
const numArray: number[] = numTuple // 정상 -> [number, number]는 number[]의 부분 집합
```

- 숫자 세 개와 두 개를 가지는 튜플 비교

```tsx
const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;
// 책에서는 할당 불가 에러 -> length 속성이 호환되지 않음

// 타입스크립트 모델링
// {0: number, 1: number} X
// {0: number, 2: number, length: number} O

~~~~// typescript 5 버전대 에러 > 배열의 elements 개수를 비교하고 있음
// Type '[number, number, number]' is not assignable to type '[number, number]'.
// Source has 3 element(s) but target allows only 2.ts(2322)
```

## 3. 타입 공간과 값 공간의 심벌 구분하기

- 타입 코드와 값 코드가 같은 이름으로 존재하는 경우

```tsx
// 타입
interface Cylinder {
  radius: number
  height: number
}

// 값
const Cylinder = (radius: number, height: number) => ({ radius, height })

function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    shape.radius // ~~~ '{}' 형식에 'radius' 속성이 없습니다.
  }
}
```

- `instanceof`는 자바스크립트의 런타임 연산자 → 값에 대해서만 연산 → 타입이 아닌 함수 참조
- 컴파일 과정에서 심벌이 사라진다면 값이 아닌 타입

### 타입과 값으로 모두 쓰일 수 있는 키워드

- class
  - 타입으로 → 속성과 메서드가 사용됨
  - 값으로 → 생성자가 사용됨
- enum
- typeof
  - 타입으로 → 값을 읽어서 타입 반환
  - 값으로 → 런타임의 typeof 연산자, 대상 심벌의 런타임 타입을 가리키는 문자열 반환

```tsx
type T1 = typeof p // Person
type T2 = typeof email // {p: Person, subject: string, body: string} => Response

const v1 = typeof p // 'object'
const v2 = typeof email // 'function'
```
