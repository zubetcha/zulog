---
title: '직렬화와 역직렬화'
summary: redux에서 만난 serialization을 nextjs에서 또 만났다.
date: '2023-11-13'
draft: false
tags: []
images: []
---

# 들어가며

redux를 처음 공부할 때 serialization과 관련된 에러를 몇 번 본 적이 있다. 그당시에 온전한 객체 형태를 전달하면 된다는 것만 알고 넘어가고, 직렬화가 무엇인지, non-serializable value는 또 어떤 걸 의미하는지 제대로 공부하지 못했다. 그러던 중 최근에 nextjs 문서에서도 직렬화 관련 문장을 발견하게 되었다.

어렴풋이 알고만 넘어갔던 게 걸려서 이참에 직렬화가 무엇인지, 또 여러 모듈에서 왜 non-serializable value는 사용하면 안 되는지 짚어보고자 한다.

<br/>

# 직렬화

위키백과에서는 직렬화를 이렇게 설명하고 있다.

> 데이터 스토리지 문맥에서 데이터 구조나 오브젝트 상태를 동일하거나 다른 컴퓨터 환경에 저장하고 나중에 재구성할 수 있는 포맷으로 변환하는 과정을 뜻한다. 오브젝트를 직렬화하는 과정은 `마샬링`한다고도 하며, 반대로 일련의 바이트로부터 데이터 구조를 추출하는 일은 역직렬화 또는 디시리얼라이제이션(deserialization)이라고 한다.

<br/>

위키에 있는 설명만 봐서는 아직 직렬화가 정확히 어떤 걸 의미하는지, 왜 하는지 이해가 잘 되지 않았다.. 🫠 그래서 여기저기 찾아 보다가 okky에서 무려 10년은 더 된 직렬화 관련 글을 찾게 되었다. 해당 글의 댓글 중 Jason Wang님의 댓글을 보면 직렬화가 무엇인지, 그리고 왜 하는지가 자세하게 설명되어 있다. Jason Wang님은 직렬화에 대해서 이렇게 설명하고 있다.

- 직렬화: 전송/저장 가능한 데이터를 만드는 행위
- 직렬화 목적: 일반적으로 파일 저장이나, 패킷 전송 시에 '파싱할 수 있는 데이터'를 만들기 위해 사용

추가적으로 내가 이해한 바를 나만의 언어로 풀어서 설명하자면, **특정한 정보를 물리적으로 각기 다른 환경을 가진 여러 곳에서 사용할 때 같은 정보를 바라볼 수 있도록 처리하는 것** 이다.

<br/>

<p align="center">
  <img src="https://hazelcast.com/wp-content/uploads/2021/12/serialization-deserialization-diagram-800x318-1.png" alt="직렬화" />
</p>

<br/>

# 왜 직렬화가 필요할까?

## axios의 request body 직렬화

Javscript에서의 대표적인 직렬화 예시로는 브라우저에서 서버로 요청을 보낼 때 데이터를 같이 실어보내는 경우가 있다. 지금까지 프로그래밍을 공부하면서 ajax를 사용한 일이 거의 없었고, 대부분의 프로젝트에서는 axios를 사용했다. 그래서 request body에 데이터를 담아야 하는 경우 어떠한 처리도 없이 javascript상의 데이터 타입 그대로 담고는 했다. 그런데 axios의 공식문서를 보면 이런 설명이 있다.

<br/>

<p align="center">
  <img src="https://github.com/zubetcha/zulog/assets/91620721/4a6108f5-93d9-4a07-8022-17d6a5793390" width="70%" />
</p>

<br/>

여기서 주목해야 할 부분은 **JSON 데이터 자동 변환** 이다.

javascript에서의 직렬화 예시로 가장 자주 언급되는 게 JSON.stringify 메서드와 JSON.parse 메서드이다. JSON.stringify 메서드는 자바스크립트의 객체를 json 문자열로 직렬화하는 메서드이며, JSON.parse는 json 문자열을 자바스크립트의 객체로 역직렬화하는 메서드라고 잘 알려져 있다.

<br/>

```javascript
const obj = { a: 1 }

// object > JSON
const jsonString = JSON.stringify(obj) // "{"a": 1}"

// JSON > object
const jsonParse = JSON.parse(jsonString) // {a: 1}
```

<br/>

axios는 내부적으로 XMLHttpRequest API를 사용하고 있다. XMLHttpRqeust는 send 메서드를 통해 request body를 전송할 수 있는데, 이 때 전송할 수 있는 데이터의 종류로는 Documnet, Blob, ArrayBuffer, TypesArray, DataView, FormData, URLSearchParams, string literal, object 등으로 정해져 있으며, 일부 데이터 종류는 send 메서드 내부적으로 serialization하는 동작이 내장되어 있다.

그런데 axios 내부적으로도 request body로 전송하는 데이터를 JSON.stringify 메서드를 이용해 직렬화하는 로직이 들어가 있다. 아래 코드는 axios가 요청 객체 중 request body를 변형시키는 함수 중 일부이다.

```javascript
// 생략

if (isObjectPayload && utils.isHTMLForm(data)) {
  data = new FormData(data)
}

if (isFormData) {
  if (!hasJSONContentType) {
    return data
  }
  return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data
}

if (
  utils.isArrayBuffer(data) ||
  utils.isBuffer(data) ||
  utils.isStream(data) ||
  utils.isFile(data) ||
  utils.isBlob(data)
) {
  return data
}

if (utils.isArrayBufferView(data)) {
  return data.buffer
}

if (utils.isURLSearchParams(data)) {
  headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false)
  return data.toString()
}

if (isObjectPayload || hasJSONContentType) {
  headers.setContentType('application/json', false)
  return stringifySafely(data)
}
```

<br/>

코드를 보면 XMLHttpRequest의 send 메서드가 지원하는 형태이더라도 그대로 사용하는 경우와 string literal로 변형하거나 JSON으로 변형하고 있는 걸 확인할 수 있다. send 메서드가 지원하는 데이터 형태임에도 불구하고 변형하는 이유를 코드만으로는 알기 어렵지만 데이터를 읽는 속도 때문이 아닐까..! 라는 게 내 개인적인 추측이다 🤔. 그래서 직렬화는 왜 하는 걸까?

<br/>

## 프로그래밍 언어와 데이터 타입 면에서의 관점

대부분의 언어에서는 데이터의 타입이 **원시의 값 형식** 데이터와 **참조 형식**의 데이터로 나뉘어진다. javascript도 마찬가지로 아래의 그림처럼 두 가지 데이터 타입이 존재한다. 원시형 타입은 변수에 값 자체를 할당하지만, 참조형 타입에서는 변수에 값이 아닌 주소값를 할당한다. 이와 같은 이유로 참조형 타입 데이터의 경우 해당 데이터가 생성된 현재의 어플리케이션 프로세스의 메모리 공간에서만 유효한 데이터를 가질 수 있다.

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1400/1*l_ZDRMLFUVaIO38p9Qkzvw.jpeg" alt="자바스크립트 데이터 타입" width="70%" />
</p>

<br/>

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1400/1*SgXa3IzvgZqhpIl5MB2xkQ.png" alt="자바스크립트 데이터 타입" width="70%" />
</p>

<br/>

예를 들어 아래의 객체를 서버로 전송하려고 할 때, 서버로 해당 객체가 가지고 있는 주소값을 보내더라도 서버는 전달 받은 주소값에 어떤 값들이 있는지 알 수 없다. 전달한 주소값은 보낸 쪽의 메모리에만 존재하기 때문이다. 따라서 데이터를 수신한 쪽에서 올바른 데이터를 파싱할 수 있도록 하려면 참조형 타입이 아닌 원시형 타입의 데이터로 변형해주는 작업이 필요하다. 이 작업이 바로 `직렬화`다.

직렬화한 데이터는 원시형 타입에서의 주소값이 가지고 있던 실제 값 자체들로 구성되어 있기 때문에 직렬화한 데이터 또한 하나의 값이다. 그래서 물리적으로 다른 환경에서도 전달 받은 값 그대로 사용할 수 있는 것이다.

```javascript
// profile에 할당한 주소값은 d10이라고 가정
const profile = { name: 'juhye', age: 100 } // d10

// d10을 서버로 전송
send(profile)

// "{ "name": "juhye", "age": 100 }"
const jsonProfile = JSON.stringify(profile)

// 원시형 값 자체를 전송
send(jsonProfile)
```

# Redux와 Nextjs에서의 non-serializable value

## Redux

리덕스를 사용할 때 아래와 같은 에러를 본 적이 있을 것이다. non-serializable value는 말그대로 직렬화를 할 수 없는 데이터를 의미한다.

> A non-serializable value was detected in an action, in the path: payload. Value: CodeMirror ...

redux의 내부 코드를 살펴보면 dispatch로 전달하는 액션 객체에서 우리가 흔히 부르는 payload에 대한 타입을 별도로 강제하고 있지는 않고, 액션 객체의 plain object 여부와 액션 타입의 키 이름 및 타입이 string인지 정도만 체크하고 있다.

```typescript
// src/types/actions.ts

export type Action<T extends string = string> = {
  type: T
}

export interface UnknownAction extends Action {
  [extraProps: string]: unknown
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}
```

위에서 직렬화를 **전송 또는 저장이 가능한 데이터를 만드는 행위** 라고 표현했었다. redux의 스토어 또한 의미상으로는 데이터를 저장하는 곳이다. 단순히 스토어가 저장하는 곳이기 때문에 직렬화 가능한 데이터만 가질 수 있다고 볼 수도 있지만 redux에서는 FAQ에서 조금 더 구체적인 사유를 설명하고 있다.

<br/>

> ### Can I put functions, promises, or other non-serializable items in my store state?
>
> It is highly recommended that you only put plain serializable objects, arrays, and primitives into your store. It's _technically_ possible to insert non-serializable items into the store, but doing so can break the ability to persist and rehydrate the contents of a store, as well as interfere with time-travel debugging.  
> If you are okay with things like persistence and time-travel debugging potentially not working as intended, then you are totally welcome to put non-serializable items into your Redux store. Ultimately, it's _your_ application, and how you implement it is up to you. As with many other things about Redux, just be sure you understand what tradeoffs are involved.

<br/>

위에서 봤던 것처럼 스토어에 저장할 상태의 타입을 별도로 강제하고 있지는 않기 때문에 기술적으로 non-serializable 값을 저장하는 것 자체는 가능하나 만약 그럴 경우 리덕스와 함께 사용하는 부수적인 라이브러리들의 기능을 원활하게 사용할 수 없다고 얘기하고 있다.

위에서 얘기하고 있는 부수적인 라이브러리의 기능은 redux-persist나 devtools 같은 것을 의미하는데, 이들은 우리가 redux의 스토어를 사용하는 애플리케이션이 아닌 브라우저 환경을 사용하는 기능들을 제공한다. 브라우저는 애플리케이션과는 물리적으로 다른 환경일 뿐더러, 브라우저의 스토리지를 사용하는 경우 반드시 직렬화가 가능한 데이터만 사용해야 한다. 왜냐하면 직렬화한 데이터를 역직렬화하는 경우 직렬화하기 전의 원본 데이터 형태를 보장할 수 없기 때문이다.

```javascript
// 생성자로 만든 객체는 non-serializable한 class instance
const now = new Date() // Sat Dec 09 2023 18:44:57 GMT+0900 (한국 표준시)

const jsonString = JSON.stringify(now) // '2023-12-09T09:44:57.995Z'

// 역직렬화 -> Date 객체가 아닌 string
const jsonParse = JSON.parse(jsonString) // '2023-12-09T09:44:57.995Z'
```

<br/>

## Nextjs

nextjs에서도 SSR을 위해 getServierSideProps를 사용하거나 SSG를 위해 getStaticProps를 사용하는 경우 종종 아래와 같은 에러 문구를 만날 때가 있다.

> SerializableError: Error serializing PATH returned from METHOD in "PAGE".  
> Reason:object ("[object Object]") cannot be serialized as JSON. Please only return JSON serializable data types.

사실 풀스택 프레임워크인 nextjs에서는 non-serializable한 데이터 전달을 금지하는 이유를 더 쉽게 유추할 수 있다. server-side와 client-side는 물리적으로 다른 환경이기 때문에 server-side rendering 과정 중 서버에서 클라이언트로 데이터를 **전송**하는 행위가 필요하기 때문이다. getStaticProps 또한 hydration 과정에서 직렬화가 필요하다.

nextjs에서는 아래와 같이 getStaticProps나 getServerSideProps가 반환하는 props가 직렬화가 가능한지를 확인하고 있다. 신기한 점은 null과 undefined 모두 원시값임에도 불구하고 null은 직렬화가 가능하다고 판단하고, undefined는 직렬화가 불가능하다고 판단하고 있다는 것이다.

```javascript
export function isSerializableProps(
  page: string,
  method: string,
  input: any
): true {
  if (!isPlainObject(input)) {
    throw new SerializableError()
  }

  function visit(visited: Map<any, string>, value: any, path: string) {
    if (visited.has(value)) {
      throw new SerializableError()
    }

    visited.set(value, path)
  }

  function isSerializable(
    refs: Map<any, string>,
    value: any,
    path: string
  ): true {
    const type = typeof value
    if (
      value === null ||
      type === 'boolean' ||
      type === 'number' ||
      type === 'string'
    ) {
      return true
    }

    if (type === 'undefined') {
      throw new SerializableError()
    }

    if (isPlainObject(value)) {
      visit(refs, value, path)

      if (
        Object.entries(value).every(([key, nestedValue]) => {
          const nextPath = regexpPlainIdentifier.test(key)
            ? `${path}.${key}`
            : `${path}[${JSON.stringify(key)}]`

          const newRefs = new Map(refs)
          return (
            isSerializable(newRefs, key, nextPath) &&
            isSerializable(newRefs, nestedValue, nextPath)
          )
        })
      ) {
        return true
      }

      throw new SerializableError()
    }

    if (Array.isArray(value)) {
      visit(refs, value, path)

      if (
        value.every((nestedValue, index) => {
          const newRefs = new Map(refs)
          return isSerializable(newRefs, nestedValue, `${path}[${index}]`)
        })
      ) {
        return true
      }

      throw new SerializableError()
    }

    throw new SerializableError()
  }

  return isSerializable(new Map(), input, '')
}

```

<br/>

# 직렬화와 JSON 직렬화

사실 자바스크립트에서 직렬화할 수 있는 타입은 여러 종류가 있다. 아래 그림처럼 원시 타입 외에도 Date, RegExp, Map, Set 객체 등도 근본적으로는 직렬화가 가능하다. 그러나 redux와 nextjs에서는 직렬화가 가능한 객체들도 직렬화가 불가능하다고 판단하고 있다. 그 기준은 JSON으로 직렬화가 가능한지 여부와 JSON.parse 메서드를 통해 역직렬화 했을 때 원본 객체를 유지할 수 있는지의 여부이다.

<p align="center">
<img width="78%" alt="" src="https://github.com/zubetcha/zulog/assets/91620721/0d89bdfa-8c75-4e3f-903b-b8433a476bf7" />
</p>

<br/>

### ref.

참고  
[OKKY - 직렬화 하는 이유가?](https://okky.kr/questions/224715)  
[MDN - XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)  
[Fetch Spec - XMLHttpRequest BodyInit](https://fetch.spec.whatwg.org/#typedefdef-xmlhttprequestbodyinit)  
[stack overflow - redux-toolkit-what-are-non-serializable-values-and-why-am-i-getting-an-error](https://stackoverflow.com/questions/72069145/redux-toolkit-what-are-non-serializable-values-and-why-am-i-getting-an-error)  
[Redux - do-not-put-non-serializable-values-in-state-or-actions](https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions)  
[MDN - serialization supported types](https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types)
