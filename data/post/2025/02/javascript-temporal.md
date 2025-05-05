---
title: '[Javscript] Temporal 톺아보기'
summary: Date 👋🏻
date: '2025-02-18'
draft: false
tags: ['javascript', 'temporal']
images: []
---

# Temporal

Javascript의 새로운 객체인 Temporal이 브라우저의 실험적 릴리즈에 도입되기 시작했다는 소식을 들었다. Temporal은 날짜, 시간, 기간, 캘린더 등을 관리하는 객체로 기존의 Date 객체의 단점을 보완하기 위해 등장했다.

Date 객체가 처음 등장한 건 1995년이었는데, 당시 Java의 java.util.Date를 그대로 복사한 것이라고 한다. Java의 Date 객체는 2년 후인 1997년에 새로운 것으로 대체된 것과 달리 Javascript의 Date 객체는 처음 도입된 이래로 현재까지 사용되고 있으니 약 30 여년이나 지난 셈이다. 오래된 객체인 만큼 여러 문제점을 지니고 있었다.

<br/>

## Date 객체의 문제점

### 1. 사용자의 로컬 시간과 UTC만 지원하며, 시간대(time zone) 개념이 없다.

타임존은 동일한 로컬 시간을 따르는 지역을 의미한다. 주로 국가에 의해 법적으로 지정되기 때문에 항상 고정적이지 않으며 정치적 혹은 경제적인 이유로 타임존이 변경될 가능성도 있다.

위와 같은 변경 가능성 때문에 타임존을 시스템에 적용하고 활용하기 위해서는 역사적으로 어떻게 변경되어 왔는지를 저장하고 있는 것이 중요한데, 현재 가장 신뢰받는 표준은 [IANA time zone database](https://www.iana.org/time-zones) 이다. 많은 개발자들과 역사학자들의 커뮤니티에 의해 관리되고 있으며, 변경 이력이 추가적으로 발견되거나 정부 정책이 변경되면 바로 갱신해 반영되기 때문에 가장 정확도가 높아 많은 신뢰를 받고 있다고 한다. 리눅스, macOS 등의 유닉스 기반 OS나 자바, PHP 등의 프로그래밍 언어 내부적으로도 IANA time zone database를 사용하고 있다.

Javascript에서는 설치된 OS에 설정된 타임존을 따르게는 되어 있으나 이를 명시적으로 변경할 수 있는 방법이 없다. ECMAScript에는 로컬 타임존이나 DST에 대한 설명도 간략하게만 정리되어 있다. Javascript 내부적으로 사용하고 있는 표준 시간대 데이터베이스에 대한 명세 또한 나와 있지 않고 IANA Time Zone Database 사용을 권장한다는 문구만 있을 뿐이다.

> An implementation dependent algorithm using best available information on time zones to determine the local daylight saving time adjustment DaylightSavingTA(t), measured in milliseconds. An implementation of ECMAScript is expected to make its best effort to determine the local daylight saving time adjustment.  
> NOTE : It is recommended that implementations use the time zone information of the IANA Time Zone Database http://www.iana.org/time-zones/.

<br/>

### 2. 날짜 파싱이 불안정하다.

Date 객체는 파라미터로 주어진 값을 날짜로 파싱해주는 [`parse()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) 라는 메서드를 제공하고 있다. parse()는 파라미터로 날짜를 표현하는 문자열을 받는데, 이를 구문 분석해서 유효한 날짜 값인 경우 UTC 이후의 밀리세컨드 수를 반환하거나, 유효하지 않는 값인 경우에는 NaN을 반환한다.

```jsx
Date.parse('2025-02-11') // 1739232000000
Date.parse('zubetcha') // NaN
```

여기서 주의할 점은, Date.parse() 메서드가 구문을 분석하는 방식이 브라우저마다 다를 수 있다는 것이다. MDN에서도 ES5까지는 Date.parse()를 사용하지 않는 것을 권장하고 있다.

몇 가지 날짜 포맷 구분 분석의 차이를 예시로 들어보자면,

- ISO 8601 형식의 구문 분석 차이

ISO 8601 형식의 날짜만 인수로 전달하면 UTC 시간대로 처리하지만, 날짜 및 시간까지 전달하면 로컬 시간대로 처리한다.

```jsx
// 날짜 형식
const utc = Date.parse('2025-02-17') // 1739750400000
// 날짜 및 시간 형식
const local = Date.parse('2025-02-17T00:00:00') // 1739718000000
// 반환값의 시간차
const offset = (utc - local) / 1000 / 60 / 60 // 9
```

- 날짜를 나타내는 문자열 형식의 분석 차이

우선, Date.parse()가 인자로 받을 수 있는 형식은 크게 [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3)와 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 두 가지가 있다. **RFC 2822**는 이메일 헤더에서 주로 사용되며, `Day, DD Mon YYYY HH:MM:SS +ZZZZ`의 형식을 가진다. **ISO 8601**은 국제 표준 날짜 형식으로서 널리 사용되고 있으며, 다양한 변형이 가능하다는 특징을 가진다.

```jsx
// RFC2822
Mon, 17 Feb 2025 15:30:00 +0900
Tue, 08 Jun 2021 11:45:00 -0400
Fri, 24 Dec 2021 23:59:59 +0000

// ISO 8601
2025-02-17T15:30:00+09:00 (표준 형식, 시간 포함)
2025-02-17 (날짜만 표기)
2025-02-17T06:30:00Z (Z는 UTC 타임존을 의미)
```

Date.parse()는 인자로 어떤 형식의 날짜 문자열이 전달되는지에 따라 다르게 구문을 분석한다. RFC 2822의 형식은 로컬 시간대로 분석하고, ISO 8601은 UTC 시간대로 분석한다. 아래의 예시를 보면 두 형식 다 날짜까지만 나타내고 있지만 Date.parse()가 처리하여 반환한 값은 다르다는 걸 알 수 있다.

```jsx
// ISO 8601
const iso = Date.parse('2025-02-17') // 1739750400000
// RFC 2822
const rfc = Date.parse('February 17, 2025') // 1739718000000
// 반환값의 시간차
const offset = (iso - rfc) / 1000 / 60 / 60 // 9
```

- 브라우저 및 전달된 값에 따른 유효 판정 차이

Date.parse()는 기본적으로 인자로 전달된 값이 날짜를 나타내는 문자열 형식인지를 판별하여 유효한 값 또는 NaN을 반환하지만, 브라우저마다 구문 분석 방식이 다르다 보니 동일한 유효하지 않은 값임에도 불구하고 어느 경우에는 NaN을 반환하지 않기도 한다.

```jsx
// 35일은 존재하지 않는 날짜이다.
// Chrome
Date.parse('35/02/2025') // NaN
// Safari
Date.parse('35/02/2025') // 2228742000000

// foo-bar은 날짜가 아니다.
// Chrome
Date.parse('foo-bar 2025') // 1735657200000
// Safari
Date.parse('foo-bar 2025') // NaN
```

### 3. Date 객체 자체가 변경 가능(mutable)하여 예기치 않은 오류를 발생시킬 수 있다.

Date 객체는 mutable하다. 의도치 않게 원본을 참조했을 때 값을 변경하는 경우 원본까지 같이 변경될 수 있다는 것이다.

```jsx
const originalDate = new Date()
const newDate = originalDate

newDate.setFullYear(2000)

console.log(originalDate) // Thu Feb 17 2000 17:48:57 GMT+0900 (한국 표준시)
console.log(newDate) // Thu Feb 17 2000 17:48:57 GMT+0900 (한국 표준시)
```

### 4. 서머타임(DST) 및 역사적인 캘린더 변경과 같은 복잡한 계산을 직접 처리해야 한다.

### 5. 그레고리 달력을 지원하지 않는다.

많은 개발자들이 위와 같은 문제들로 인해 javascript 기반 프로젝트에서 날짜를 다룰 때 momentjs, date-fns 등의 라이브러리를 주로 사용하고는 한다.

<br/>

## Temporal 톺아보기

### 주요 특징

Temporal은 기존의 Date 객체를 완전히 대체할 수 있도록 설계되었다. 따라서 위에서 언급한 Date 객체의 단점들을 보완하며, 날짜 및 시간을 처리할 때 개발자가 예측 가능하도록 만들어졌다.

- 타임존과 그레고리 캘린더를 지원한다.
- **변환(conversion), 비교(comparison), 연산(computation), 포맷팅(formatting)** 등의 약 200개의 다양한 내장 메서드 제공한다.

<br/>

### 코어 컨셉

Temporal의 코어 컨셉으로는 크게 세 가지가 있다.

- **순간(Instant):** 역사상 특정한 한 시점
- **벽시계 시간(Wall-clock Time):** 지역(time zone)별로 다르게 표현되는 시간
- **기간(Duration):** 두 시점 간의 차이

Temporal의 API 구조는 위의 컨셉에 따라 설계되었다고 한다.

| 개념                    | Temporal 객체           | 설명                             |
| ----------------------- | ----------------------- | -------------------------------- |
| 순간(Instant)           | Temporal.Instant        | UTC 기준의 특정 시점             |
| 시간대 포함된 날짜/시간 | Temporal.ZonedDateTime  | 시간대 정보를 포함하는 날짜/시간 |
| 시간대 없음 (Plain)     | Temporal.PlainDateTime  | 날짜와 시간을 표현 (시간대 없음) |
|                         | Temporal.PlainDate      | 연, 월, 일만 표현                |
|                         | Temporal.PlainYearMonth | 연, 월만 표현                    |
|                         | Temporal.PlainMonthDay  | 월, 일만 표현                    |
|                         | Temporal.PlainTime      | 시간만 표현                      |
| 현재 시간               | Temporal.now            | 현재 시간을 다양한 형식으로 제공 |
| 기간                    | Temporal.Duration       |                                  |

<br/>

ref.

[JavaScript Temporal is coming | MDN Blog](https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/?ck_subscriber_id=2828593286)

[Temporal - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)

[[JS]타임존과 Date 다루기](https://pyh.netlify.app/javascript/javascript_date/)

[자바스크립트에서 타임존 다루기 (1) : NHN Cloud Meetup](https://meetup.nhncloud.com/posts/125)

[자바스크립트에서 타임존 다루기 (2) : NHN Cloud Meetup](https://meetup.nhncloud.com/posts/130)

[Temporal documentation](https://tc39.es/proposal-temporal/docs/)

[Fixing JavaScript Date – Getting Started](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/)

[Temporal documentation](https://tc39.es/proposal-temporal/docs/strings.html)
