---
title: '[Javscript] Temporal 톺아보기'
summary:
date: '2025-02-17'
draft: true
tags: ['javascript']
images: []
---

# Temporal

Javascript의 새로운 객체인 Temporal이 브라우저의 실험적 릴리즈에 도입되기 시작했다는 소식을 들었다. Temporal은 날짜, 시간, 기간, 캘린더 등을 관리하는 객체로 기존의 Date 객체의 단점을 보완하기 위해 등장했다.

Date 객체가 처음 등장한 건 1995년이었는데, 당시 Java의 java.util.Date를 그대로 복사한 것이라고 한다. Java의 Date 객체는 2년 후인 1997년에 새로운 것으로 대체된 것과 달리 Javascript의 Date 객체는 처음 도입된 이래로 현재까지 사용되고 있으니 약 30 여년이나 지난 셈이다. 오래된 객체인 만큼 여러 문제점을 지니고 있었다.

## Date 객체의 문제점

**1. 사용자의 로컬 시간과 UTC만 지원하며, 시간대(time zone) 개념이 없다.**

타임존은 동일한 로컬 시간을 따르는 지역을 의미한다. 주로 국가에 의해 법적으로 지정되기 때문에 항상 고정적이지 않으며 정치적 혹은 경제적인 이유로 타임존이 변경될  가능성도 있다.

위와 같은 변경 가능성 때문에 타임존을 시스템에 적용하고 활용하기 위해서는 역사적으로 어떻게 변경되어 왔는지를 저장하고 있는 것이 중요한데, 현재 가장 신뢰받는 표준은 [IANA time zone database](https://www.iana.org/time-zones) 이다. 많은 개발자들과 역사학자들의 커뮤니티에 의해 관리되고 있으며, 변경 이력이 추가적으로 발견되거나 정부 정책이 변경되면 바로 갱신해 반영되기 때문에 가장 정확도가 높아 많은 신뢰를 받고 있다고 한다. 리눅스, macOS 등의 유닉스 기반 OS나 자바, PHP 등의 프로그래밍 언어 내부적으로도 IANA time zone database를 사용하고 있다.

Javascript에서는 설치된 OS에 설정된 타임존을 따르게는 되어 있으나 이를 명시적으로 변경할 수 있는 방법이 없다. ECMAScript에는 로컬 타임존이나 DST에 대한 설명도 간략하게만 정리되어 있다. Javascript 내부적으로 사용하고 있는 표준 시간대 데이터베이스에 대한 명세 또한 나와 있지 않고 IANA Time Zone Database 사용을 권장한다는 문구만 있을 뿐이다.

<aside>
💡

An implementation dependent algorithm using best available information on time zones to determine the local daylight saving time adjustment DaylightSavingTA(t), measured in milliseconds. An implementation of ECMAScript is expected to make its best effort to determine the local daylight saving time adjustment.

NOTE : It is recommended that implementations use the time zone information of the IANA Time Zone Database http://www.iana.org/time-zones/.

</aside>

**2. 날짜 파싱이 불안정하다.**

Date 객체는 파라미터로 주어진 값을 날짜로 파싱해주는 [`parse()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) 라는 메서드를 제공하고 있다. parse()는 파라미터로 날짜를 표현하는 문자열을 받는데, 이를 구문 분석해서 유효한 날짜 값인 경우 UTC 이후의 밀리세컨드 수를 반환하거나, 유효하지 않는 값인 경우에는 NaN을 반환한다.

```jsx
Date.parse('2025-02-11'); // 1739232000000
Date.parse('zubetcha'); // NaN
```

여기서 주의할 점은, parse() 메서드가 구문을 분석하는 방식이 브라우저마다 다를 수 있다는 것이다. 

**3. Date 객체 자체가 변경 가능(mutable)하여 예기치 않은 오류를 발생시킬 수 있다.**

**4. 서머타임(DST) 및 역사적인 캘린더 변경과 같은 복잡한 계산을 직접 처리해야 한다.**

**5. 그레고리 달력을 지원하지 않는다.**

ref.

[JavaScript Temporal is coming | MDN Blog](https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/?ck_subscriber_id=2828593286)

[Temporal - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal)

[[JS]타임존과 Date 다루기](https://pyh.netlify.app/javascript/javascript_date/)

[자바스크립트에서 타임존 다루기 (1) : NHN Cloud Meetup](https://meetup.nhncloud.com/posts/125)

[자바스크립트에서 타임존 다루기 (2) : NHN Cloud Meetup](https://meetup.nhncloud.com/posts/130)

[Temporal documentation](https://tc39.es/proposal-temporal/docs/)

[Fixing JavaScript Date – Getting Started](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/)

[Temporal documentation](https://tc39.es/proposal-temporal/docs/strings.html)