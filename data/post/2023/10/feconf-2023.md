---
title: 'feconf 2023'
category:
date: 2023-10-21
description:
published: false
slug: feconf-2023
tags:
  -
---

## 웹 기반 그래픽 편집기의 구조와 7가지 디자인 패턴

### Factory

#### 심플 팩토리

심플 팩토리가 제공하는 두 가지

- OCP
- DIP

#### 팩토리 메서드 패턴

#### 추상 팩토리 패턴

### Composite 패턴

- 부분-전체 계층 구조
  - 하나의 트리 노드를 단일 객체인 것 처럼 다룰 수 있게 해줌
- 투명성
- 타입 안전성

### 상태 패턴

- 이벤트 -> EventDispatcher가 이벤트 수신 -> Canvas로 전달

### 전략 패턴

- MVC 패턴에서는 Model을 어떻게 수정할 지를 Controller가 해석하고 판단해야 함
- Controller가 재활용 할 수 있도록 EditPolicy 적용
- 각각의 Controller가 적용해야 하는 Policy를 가짐

#### 전략 패턴의 특징

- 확장성
- 런타임에 작동 방식 변경
- 알고리즘 재사용

#### 상태 패턴과 전략 패턴

- 쌍둥이..!

### 커맨드 패턴

- 스택에 커맨드를 담아서 모델에 전달
- 커맨트 스택에서 상위 클래스 - 하위 클래스 구조를 활용하면 하위 클래스에서 undo, redo를 직접 구현하지 않아도 됨

### 플러그인 패턴

## use 훅이 바꿀 리액트 비동기 처리의 미래 맛보기

- React 18.2
- Client Component

### React에서의 비동기 처리

- data fetching용 커스텀 훅 사용
- react-query 등의 서버 상태 관리 라이브러리 사용
- React Suspense + ErrorBoundary

> React의 Client Component는 async일 수 없다

### React RFC: use

- 클라이언트 컴포넌트에서 Promise를 일급 지원하는 새로운 hook
- 컴포넌트를 렌더링하는 도중에 아직 resolve 되지 않은 Promise를 만나면 가장 가까이에 있는 Suspense의 fallback을 트리거하는 구조
- 아직 런타임에서는 동작하지 않음
- use 대신 Promise를 직접 throw하면 Suspense 트리거
- await와 비슷한 역할
- 기존의 hook들과 달리 조건부 호출 가능

### Case

#### 기존 Hook들의 제약

- 불필요한 blocking -> TTI 증가
- 코드 응집도 저하 -> DX 떨어짐

```javascript
function useInventory({ userId }) {
	const { inventory } = useUserInfo({ userId });
	const normalItems = useNormalItems(); // blocking 발생
	const eventItems = useEventItems(); // blocing 발생

	return inventory.filter((item) => {
		// ...
	});
}
```

- 로드해야 하는 리소스 데이터의 종류가 점점 더 많아진다면?
  - 로딩하는 코드와 사용하는 코드의 거리가 점점 더 멀어짐
- hook의 제약 때문에 최상단에서 사용해야 함

use를 사용하면

```javascript
function useInventory({ userId }) {
	const { inventory } = useUserInfo({ userId });

	return inventory.filter((item) => {
    if (normal 아이템이면) use(fetchNormalItems()) // 조건부 호출
    if (event 아이템이면) use(fetchEventItems())
	});
}
```

#### request waterfall 현상 해결하기

- prefetch
- parrelel query

#### use의 제약

- 런타임에서는 정상적으로 동작할 수도 있으나 compiler error를 발생시킬 수 있음
- Component 및 hook 내부에서만 사용 가능

> compiler  
> React Forget이라는 React의 최적화 컴파일러

### 그 외...

- 동기함수 Promise 블록킹 원리 - 컴포넌트 멱등성
- promise 객체에서 결과값 꺼내기
- use(Context)
- Server Component와 함께 사용하기

## 몇 천 페이지의 유저 가이드를 새로 만들며

#### 아코디언 + 검색 문제

- 키워드를 검색하면 해당 키워드를 담고 있는 아코디언이 열리면 좋겠다
  - hidden="until-found"
  - beforematch 이벤트

#### ReactDOM

- JSX -> React Component -> React Dom에 반영하는 과정에서 until-found가 빈 문자열로 변환됨
- hidden="until-found" 속성이 최신 스펙이기 때문에 React에서는 잘못된 값으로 인식

#### 우회하기

- HTML은 속성 이름의 대소문자를 가리지 않음
- React는 예약되어 있는 소문자 속성 및 on으로 시작하는 속성만 검증
- hidden 속성을 HIDDEN으로 변경하면 정상적으로 동작

```jsx
<div STYLE='background: white;' /> // OK
```

### 유저 가이드를 이전하며

- 기존 Jenkins 툴 -> Headless CMS
- Nextjs SSG + revalidate (ISR) 사용
- 이전하는 컨텐츠 페이지의 수에 비례하여 빌드 속도가 증가하는 문제 발생

- 데이터 캐시를 활용하여 빌드 속도 올리기
- 한 번 이상 방문해야 cache hit를 활용할 수 있는 문제 -> 크롤러 활용하여 데이터 캐시 활성화

###

- 문제 해결을 위한 제한 시간 설정

## 이벤트 기반 웹뷰 프레임워크 설계와 플러그인 생태계 만들기

- 라이브러리 설계 및 개발

### 웹뷰 화면 전환

- History API 확장
  - History API 자체만으로는 이전 히스토리의 상태에 접근할 수 없는 문제
  - React로 래핑하여 이전 히스토리 상태에도 접근할 수 있도록
- 문제점
  - 테스트하기 어려움
  - History API와 React가 가지고 있는 상태 동기화에서 버그 발생
  - React 기술에 종속
  - 확장성 떨어짐
    - 동작이 react-router-dom에 의존

### 리팩토링

- 고려해야 하는 본질 다시 생각해보기
  - transition, navigation, url -> Stack
  - 기존에 의존해야 했던 기술 스택들을 의존할 필요가 없어짐
- 이벤트 기반으로 설계

`코어 로직`
상태 = 로직(핼동들)

#### React와 통합하기

- useSyncExternalStore()

#### 이벤트 스냅샷을 이용한 이슈 트래킹

- 기존에는 유저 시나리오에 기반해서 이슈를 재현해야 했음
  - 환경 혹은 시나리오에 따라 이슈 재현 어려운 상황 발생
  - 커뮤니케이션 비용 증가
- 이벤트 기반 설게를 통해 이벤트 스냅샷으로 이슈 재현 및 트래킹이 용이해짐

### 확장성

- 미리 재료 준비하기
- 대신 일관된 인터페이스로 노출시키기
- 준비할 재료가 많아질수록 유저가 사용하기 어렵게 느낌 (이해하기 위한 비용 올라감)

#### 확장성을 높이면서 유저가 쉽게 느끼도록 하려면

- 플러그인 인터페이스를 통해

### 생태계 만들기

- 플러그인을 통한 향상성 확보
- 신규 플러그인 -> 생태계 성장 -> 앱 향상

### 결론

## 대형 웹 애플리케이션 Micro Frontends 전환기

- 기존에는 페이지별로 앱을 나눠서 사용하는 구조
  - 페이지를 이동할 때마다 해당 페이지에 필요한 리소스들을 새로 로드해야 하는 구조적 문제점
- Module Federation을 이용해 해결

> Module Federaition  
> 각각의 앱이 런타임 환경에서 번들을 로드해 사용  
> 배포단위를 더 작게 쪼개서 런타임에 통합하는 방식
ㅇ
