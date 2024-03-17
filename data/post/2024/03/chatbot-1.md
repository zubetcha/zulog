---
title: '카카오톡 챗봇 만들기 1편'
summary: 그런데 게임을 위한 ^^7
date: '2024-03-10'
draft: false
tags: ['project', 'chatbot']
images: []
---

# 들어가며,

1년 정도 전부터 모바일 메이플스토리를 시작했다. 지금도 정말 열심히 하고 있고, 마침 시작할 때 우연히 들어온 길드에 아직까지 몸 담고 있다🫡. 카카오톡 오픈채팅방에 길드와 관련한 채팅방이 굉장히 많은데, 그중 컨텐츠방은 우리 길드+다른 길드 사람들이 함께 들어가 있어 매일 레이드 컨텐츠에 참여할 명단을 작성하는 데 사용된다. 문제는 명단 작성이 수기로..Ctrl C+Ctrl V로 이뤄진다는 점이다..!🥲

컨텐츠 명단에 작성하고 싶으면 직전에 업데이트된 명단을 전체복사해서 내가 원하는 팀과 번호에 닉네임을 작성하고 다시 채팅에 보내야 한다. 종종 동시에 명단을 작성하거나 직전 명단이 아닌 더 과거의 명단으로 잘못 보고 복사하는 경우 누락되는 인원이 생기기도 했었다.

<p align="center">
  <img width="50%" alt="스크린샷 2024-03-16 오후 7 56 56" src="https://github.com/zubetcha/seed-bot/assets/91620721/f3fe281a-aa7c-4b30-b2c7-ed53bb0435ab" />
</p>

길드원들과는 친해진 지 꽤 오래되어서 이미 내가 개발자라는 걸 알고 있는 사람들도 있다. 그래서 봇 얘기가 나올 때 우스갯소리로 '홍차(내 닉네임)님이 한번 만들어 보시져' 라고 말하는 사람들도 있었다. 사실 만들면 만드는 건데 평일, 주말 할 것 없이 뭔가 빠르게 만들기에는 짬이 안 나서 미루고 미루다가 드디어 만들게 되었다!

<br/>

# 챗봇 만드는 방법

## 준비

### 안드로이드 디바이스에 카카오톡, 메신저봇r 설치하기

우선 챗봇을 만들기 위해서는 안드로이드 디바이스가 필요하다. [메신저봇r](https://play.google.com/store/apps/details?id=com.xfl.msgbot&hl=ko&gl=US)이라는 앱을 설치해야 하는데, 구글 플레이에만 있기 때문이다. 메신저봇r은 메신저 앱의 알림을 읽어서 채팅방에 응답을 보낼 수 있도록 해주는 앱이다. 자바스크립트를 포함한 여러가지 언어를 지원한다. 나는 공기계를 중고로 구매할까도 생각했지만..비용을 많이 들이고 싶지는 않아서 대신 노트북에 안드로이드 애뮬레이터를 설치해서 사용했다. 메신저봇r만 있어도 간단한 응답은 구현할 수 있다. 다만, 내부적으로 Rhino Javascript Engine을 사용하고 있기 때문에 자바스크립트를 알고 있어야 스크립트를 원활하게 작성할 수 있다.

봇용으로 사용할 카카오톡 계정이 있어야 하는데, 가상 번호를 받는 방법도 있지만 왜인지 찾아본 것들이 다 위험해 보이는 너낌이 들어서,, 그냥 마음 편하게 통신사에 이중 번호 서비스 신청해서 번호를 새로 받았다.

### 응답 처리할 nodejs 서버

카카오톡 챗봇을 만드는 방법은 여러가지가 있는데 [나무위키](https://namu.wiki/w/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%20%EB%B4%87/%EC%A0%9C%EC%9E%91%EB%B2%95)에 간단하게나마 소개가 되어 있다. 자바스크립트가 익숙한 나는 [remote-kakao](https://github.com/remote-kakao)를 사용하려고 했는데, 결론부터 말하자면 실패했다.

remote-kakao는 제공해주는 client용 코드 스니펫을 메신저봇r에 붙여넣고, 별도로 응답 처리용 nodejs 서버를 띄워서 서로 통신하게 하는 방식인데, 내가 설치한 에뮬레이터에서는 client용 코드 컴파일이 되지 않았다. 복잡한 로직이 필요한 건 아니라서 그냥 메신저봇r에는 직접 함수를 구현하기로 하고, nodejs 서버도 `express`를 사용해서 직접 구성하는 걸로 변경했다.

## 만들기

### 응답 프로세스 구조 및 기술 정하기

프로세스 구조에서 구성 요소로 크게 3가지가 있는데, 카카오톡, 메신저봇r, 별도로 구성한 서버이다.

1. 카카오톡에서 봇이 참여하고 있는 채팅방에서 누군가 채팅 메시지 입력 -> 메시지 알림
2. 메신저봇r에서 알림 감지 및 유의미한 정보 식별하여 가공 후 서버에 전달
3. 서버에서 해당하는 명령어에 맞는 처리 후 메신저봇r에 응답
4. 메신저봇r은 받은 응답으로 카카오톡에 채팅 메시지 입력

서버는 간단하게 express로 구성하기로 하고, 명단을 작성하거나 수정하는 간단한 기능이니..nodejs의 fs만으로도 충분할 거라고 생각하고 json으로 명단 데이터를 관리하고 html으로 템플릿을 만들기로 했다..추후 nodejs의 fs를 제대로 이해하지 못하고 쉽게 생각해버린 과오로 인해 꽤나 심각한 문제가 생겼다. 문제와 해결에 대한 얘기는 나중에..🫠

### 채팅 메시지 패턴 정하기

모든 채팅에 응답하면 안 되기 때문에 응답이 필요한 메시지인지 식별하기 위한 패턴을 정하는 것이 좋다. 메이플m 오픈채팅방들을 보면 주로 느낌표(!)를 prefix로 많이 붙이는 듯 해서 그대로 차용했다. 레이드 컨텐츠랑 명령어 종류가 다양해서 해서 필요한 기능에 따른 명령어 패턴을 아래와 같이 정리해 보았다.

```text
!명단 (컨텐츠)
!가입 (컨텐츠) (팀) [(닉네임) (번호)]
!수정 (컨텐츠) (팀) (닉네임/번호) (수정할 닉네임)
!탈퇴 (컨텐츠) (팀) (닉네임/번호)
!이동 (컨텐츠) (팀) (닉네임/번호) (이동할 팀) [(번호)]
```

### 메신저봇r response 함수 작성

메신저봇r의 스크립트를 수정하기 위해서는 메인 화면에서 봇을 만든 뒤 두 번째 작성 버튼을 클릭하면 된다. 메신저봇r을 설치하면 기본적으로 작성되어 있는 코드가 있다. response를 제외한 나머지 함수는 사용하지 않으니 지워줘도 된다.

<p align="center">
  <img width="50%" alt="스크린샷 2024-03-17 오후 5 23 04" src="https://github.com/zubetcha/seed-bot/assets/91620721/77f4ab76-f773-405c-a8e2-32c175ecb7fb" />
</p>

```javascript
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  // ...
}
function onStartCompile() {
  // ...
}
function onNotificationPosted(statusBarNotification, sessionManager) {
  // ...
}
function onCreate(savedInstanceState, activity) {
  // ...
}
function onPause(activity) {
  // ...
}
function onResume(activity) {
  // ...
}
function onStop(activity) {
  // ...
}
```

response 함수는 메신저봇이 메신저 앱의 알림을 통해 메시지 내용을 성공적으로 파싱했을 때 호출되는 함수이다. 인자에 대해서 간단히 살펴보자면,

- room: 메시지가 온 채팅방 이름
- msg: 메시지의 내용
- sender: 메시지를 보낸 사람의 닉네임
- isGroupChat: 메시지를 보낸 방이 개인 채팅방이면 false, 단체 채팅방이면 true
- replier: 채팅에 답장을 하는데 사용할 수 있는 객체. 자세한 내용은 메신저봇 가이드 - 레거시 API를 확인하세요
- imageDB: 프로필 사진 정보를 담고 있는 객체. 자세한 내용은 메신저봇 가이드 - 레거시 API를 확인하세요
- packageName: 채팅이 온 메신저 앱의 패키지명 (예를 들어 카카오톡의 경우 com.kakao.talk

꽤나 다양한 정보들을 제공해주는데, 씨앗봇은 컨텐츠방에서만 사용할 예정이라 나는 msg, sender, replier만 사용했다.

msg에서 API를 호출하기 위해 필요한 정보들을 찾고, 명령어에 따라 API를 호출하고, 응답으로 받은 걸 가공한 후 카카오톡에 다시 보낸다.

```javascript
const [cmd, content, team, nickname, ...rest] = msg.trim().split(' ')

if (cmd === '가입') {
  const reqData = {
    nickname: nickname ? nickname : sender,
    content: content,
    team: Number(team),
  }
  const result = joinContet(reqData)

  replier.reply(room, result)
}
```

메신저봇r의 스크립트에서 지원하지 않는 자바스크립트 문법들이 많아서 컴파일 시도하는 데 시간이 꽤나 걸렸다. 아마도 ECMAScript 버전이 예전 버전인 것 같은데, 정확한 버전은 찾지 못하였다.

### 메신저봇r에서 API 호출하기 (w/ jsoup)

nodejs 서버로 API를 호출하기 위해 fetch를 사용해 보았지만..?! 역시나 지원하지 않았고, 메신저봇r에 대해서 찾아보던 중 내부적으로 스크립트에서 jsoup을 사용해 다른 서버로 요청을 보낼 수 있다는 사실을 알아냈다. 요청을 보내는 방법은 아래와 같다.

```javascript
const response = org.jsoup.Jsoup.connect(BASE_URL + '/contents/member/join')
  .header('Content-Type', 'application/json')
  .requestBody(JSON.stringify(data))
  .ignoreContentType(true)
  .ignoreHttpErrors(true)
  .post()
```

jsoup의 connect는 `GET`, `POST` 메서드밖에 지원하지 않는다. 그래서 어쩔 수 없이 경로에 행위를 지칭하는 단어까지 추가할 수밖에 없었다. 그래도 요청을 보낼 수 있는 게 감지덕지긴 하다.🥹

### 서버에서 응답 처리하기

서버에서 하는 일 자체는 간단하다. 예외처리 및 요청에 맞게 명단을 수정하고, 템플릿을 가공해서 다시 보내주기만 하면 된다. 템플릿 html을 가공하기 위해서 [cheerio](https://cheerio.js.org/)를 사용했는데, html과 xml을 파싱하거나 조작하는 데 사용하는 라이브러리이다.

```javascript
// 기존 명단 가져오기
const jsonStr = fs.readFileSync(getDataFilePath('list.json'), 'utf-8')
const jsonObj = JSON.parse(jsonStr)

// ~ 명단 수정하는 로직 ~

// 새로운 명단 만들기
const newJson = { ...jsonObj, [content]: newList }

// 템플릿 html 수정
const htmlStr = fs.readFileSync(getDataFilePath(fileName), 'utf-8')
const $ = cheerio.load(htmlStr, null, false)
const targetId = `#${content}-${team}-${newNo}`

$(targetId).append(` ${nickname}`)

// json, html 수정
fs.writeFileSync(getDataFilePath('list.json'), JSON.stringify(newJson, null, 2))
fs.writeFileSync(getDataFilePath(fileName), $.html())
```

<br/>

# 결과

메신저봇r 화면에서 세 번째 버튼을 누르면 디버깅용으로 사용할 수 있는 화면이 나온다. 실제로 사용하는 것처럼 채팅을 입력하면 그에 대한 응답을 보내준다.
디버깅 화면에서도, 실제로 카톡에서도 응답이 잘 오는 걸 확인할 수 있었다.

<p align="center">
  <img width="56%" alt="스크린샷 2024-03-17 오후 6 15 48" src="https://github.com/zubetcha/seed-bot/assets/91620721/134ecb20-cc21-4615-bec7-0788c6e578b3"/>
</p>

컨텐츠방 사람들에게 명단 작성하는 방법을 알려주고 막 사용하기 시작했을 때, 처음에는 순조롭게 흘러가는 듯 했다. 하지만 머지 않아 문제가 터지기 시작했다. 🥲 express 서버는 [koyeb](https://www.koyeb.com/)이라는 서버리스 서비스로 배포했는데, 짧은 간격으로 요청이 여러번 들어오는 경우 서버 자체가 죽거나 살아 있어도 제대로된 응답을 주지 못했다.

<p align="center">
  <img width="50%" alt="스크린샷 2024-03-17 오후 6 24 34" src="https://github.com/zubetcha/seed-bot/assets/91620721/eb0e841d-d3a4-436f-bcfc-f888924e0b7d" />
</p>

<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
  <img width="49%" alt="스크린샷 2024-03-17 오후 6 22 45" src="https://github.com/zubetcha/seed-bot/assets/91620721/274886ff-018f-464c-9f89-0a350eff53a0" />
  <img width="49%" alt="스크린샷 2024-03-17 오후 6 23 43" src="https://github.com/zubetcha/seed-bot/assets/91620721/b266ecb1-a63c-4f96-ba9f-6bd1146b7901" />
</div>

현재는 잘 해결되었는데, 해결한 방법은 2편에서 풀어보려고 한다!
