---
title: '[웹 성능 최적화 기법] Chapter 04'
summary: 이미지 최적화
date: '2024-06-22'
draft: false
tags: ['book', 'web', 'optimization']
images: []
---

# 1. 이미지의 중요성

- 브랜드 및 상품 홍보를 위해 시간이 지날수록 점점 더 많은 이미지를 노출하고, 이미지 1개당 크기도 증가하고 있음
- 유저가 사이트에 접속해서 보는 가장 크고 눈에 띄는 이미지를 **Hero 이미지** 또는 **대문 이미지**라고 부르나, 크기가 큰 이미지를 그대로 사용하는 경우 다운로드하는 데 더 오랜 시간이 소요되어 전체 로딩 시간을 지연 시킬 수 있음 → 웹 성능 저하

<br/>

### 화소 밀도

- 물리 스크린 공간 안에 얼마나 많은 픽셀이 압축되어 있는지
- 1x, 2x와 같은 `기기 픽셀 비율(Device Pixel Ratio, DPR)`로 표현
- 모니터나 TV의 화소 밀도는 인치당 픽셀 개수인 PPI(Pixel Per Inch)로 표현

<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAYCZPCrU0sy_qxvKi3r39Z0KYWUDkEPreKQ&s" alt="기기 픽셀 비율" />
</p>

<br/>

# 2. 디지털 이미지의 종류와 특성

### JPEG와 PNG

**PNG**

- `알파 채널`이라는 이미지 변환 기법 사용

  - 이미지 레이어를 제외한 배경 이미지 레이어 제거 → 전체 이미지 투명하게 사용 가능

<br/>

### 래스터 이미지 vs 벡터 이미지

<p align="center">
  <img src="data:image/png;base64,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" alt="래스터 이미지 벡터 이미지" />
</p>

- 디지털 화면에 이미지들을 어떻게 표현하는지에 따라 **래스터 이미지**와 **벡터 이미지**로 분류

**래스터 이미지**

- 픽셀 1개에 색상 정보를 입력해 컴퓨터로 표현하는 방식
- 픽셀들이 모여 하나의 큰 이미지 구성
- 확장성 떨어짐

**벡터 이미지**

- 표현하고자 하는 대상의 **수학적 정보** 제공
  - 좌표, 형상, 크기, 색상 등의 메타 데이터
- 컴퓨터가 마치 그림을 그리듯 표현
- `svg`가 가장 많이 사용됨
- 화면이 커지거나 작아진다고 해서 이미지가 달라지지 않음 → 항상 선명한 이미지 표현 가능
- 이미지가 복잡해지면 그만큼 제공해야 하는 정보도 늘어남 → 단순한 이미지에 적합

<br/>

### 무손실 이미지 형식 vs 손실 이미지 형식

- 원본 이미지 정보 손실 허용 여부에 따라 **무손실** 또는 **손실** 이미지 형식으로 구분
- 사이즈를 압축하거나, 단순 복사 및 저장할 때에도 정보 손실이 발생할 수 있음

|               | GIF    | PNG    | JPEG   | JPEG 2000   | WebP                                                                 | JPEG XR                    |
| ------------- | ------ | ------ | ------ | ----------- | -------------------------------------------------------------------- | -------------------------- |
| 압축률        | 보통   | 보통   | 높음   | 매우 높음   | 매우 높음                                                            | 매우 높음                  |
| 압축 방식     | 무손실 | 무손실 | 손실   | 손실/무손실 | 손실/무손실                                                          | 손실/무손실                |
| 애니메이션    | 지원   | 미지원 | 미지원 | 지원        | 지원                                                                 | 지원                       |
| 투명          | 미지원 | 지원   | 미지원 | 지원        | 지원                                                                 | 지원                       |
| 점진적 전송   | 지원   | 지원   | 지원   | 지원        | 미지원                                                               | 지원                       |
| 지원 브라우저 | 모든   | 모든   | 모든   | 사파리      | 크롬<br/>오페라<br/>안드로이드<br/>파이어폭스(v65+)<br/>사파리(v14+) | 인터넷 익스플로러<br/>엣지 |

**GIF (Graphic Interchange Format)**

- 무손실 이미지
- 인터넷이 활성화된 이래 가장 처음으로 등장한 이동식 이미지 형식
- 사용할 수 있는 색이 **256(8비트)개**밖에 안 되기 때문에 화려하거나 복잡한 이미지보다는 단순한 형태의 이미지 표현에 적합

**PNG (Portable Network Graphic)**

- 무손실 이미지
- GIF의 컬러 제한 문제와 특허 문제를 해결하게 위해 개발됨
- **24비트** 컬러 사용
- **알파 채널 기법**의 투명 기능 때문에 웹사이트에서 많이 사용됨

**JPEG (Joint Photographic Experts Group)**

- 손실 이미지
- 디지털 카메라의 RAW 형식 파일 크기가 큰 문제를 해결하기 위해 Joint Photographic Experts Group사에서 만든 이미지 형식
- 인간이 인식할 수 있는 색상을 제외한 나머지 정보는 제거
- 고해상도 이미지를 크게 압축하여 저장할 수 있음
- 사용자가 품질 값 결정 가능 (0~100)
  - 100으로 설정해도 약간의 손실이 발생하기 때문에 여러번 편집해야 하는 경우 무손실 이미지로 편집을 완료한 후에 마지막에 JPEG로 저장하는 것이 좋음

**JPEG 2000**

- JPEG의 단점을 보완하기 위해 새롭게 개발한 형식
- 기존의 JPEG와는 다른 압축 방식 사용
- **무손실 압축, 투명 기능, 애니메이션 기능** 제공
- **16비트, 24비트, 32비트** 등의 다양한 색상 지원
- 제공하는 기능이 많은 만큼 더 많은 프로세싱 자원을 필요로 함
- 단, 대부분의 브라우저에서 미지원 (사파리 계열만 지원)

**WebP**

- 구글에서 개발한 이미지 형식
- JPEG보다 개선된 압축 방식 사용
- **무손실 압축, 애니메이션 기능, 투명 기능** 지원
- 이미지 품질을 많이 낮추면 약간의 손실 발생 가능
- 점진적 데이터 전송 기능 미지원 (JPEG는 지원)

**JPEG XR**

- MS에서 개발
- 표현할 수 있는 색상 범위 확장
- 무손실 압축, 투명 기능, 점진적 데이터 전송 기능 지원
- 대부분의 브라우저에서 미지원 (인터넷 익스플로러, 앳자만 지원)

<br/>

# 3. 이미지 변환 기법

### 무손실 압축

- 무손실 압축을 하려면 각 이미지 유형을 다르게 처리해야 하나, 스크립트를 통해 압축을 자동화할 수 있음
- 오픈 소스 라이브러리를 이용해 자동화 가능

|      | GIF             | PNG                                                                                                                                     | JPEG |
| ---- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| 특징 | 256개 컬러 지원 | 첫 8바이트를 제외한 나머지는 청크로 이미지 정보 저장<br/>사용자 정의 청크 추가 가능<br/>웹 렌더링에 필요하지 않은 정보 청크는 삭제 가능 |

| 파일 안에 이미지 정보 외에 많은 메타 데이터 포함<br/>- 주석 및 공백<br/>- 편집 앱 정보<br/>- 카메라 정보, 사진 촬영 날짜, 사진 위치 정보 등
|
| 압축 라이브러리 | ImageMagicK<br/>Giflossy<br/>Gifsicle<br/>gif2webp<br/>converter | Pngcrush<br/>Pngquant | MozJPEG<br/>libJpeg<br/>Guetzli |

<br/>

### 손실 압축

- 특정 이미지 정보를 누락(손실)시켜 압축시키는 방식
  - 기존 이미지 형식 디코딩 → 알고리즘으로 화질 저하 → 원래의 이미지 형식으로 인코딩
- JPEG 기준 **100~75%** 품질 사이에서는 품질 차이가 거의 눈에 띄지 않는다고 함
  - 책에서는 85~80% 손실 압축 권장
  - 단, 이미지 특성에 따라 적정 품질 지수는 달라질 수 있음

<br/>

# 4. 반응형 웹에서의 이미지 배치 전략

### 모바일 전용 사이트의 문제점

- 모바일 기기 크기의 다양화로 모든 사용자를 만족시키기 어려워짐
- 데스크톱용+모바일 사이트 동시 개발 및 관리의 어려움
- 기능 누락 및 UI/UX 상이로 인한 사용자 경험 저하

<br/>

### 반응형 웹

<p align="center">
  <img src="https://cdn.imweb.me/upload/S20170210589dc12ece375/5c12f7d5c197e.jpg" alt="반응형 웹" />
</p>

- 다양한 기기의 화면 크기에 최적화된 웹 페이지 제공
- 기기별로 사이트를 구축하지 않아도 됨
- 사용성 개선
- SEO 이점

<br/>

### 반응형 웹의 문제점

- 성능상의 문제
  - 동일한 조건에서는 화면의 크기가 달라져도 성능은 동일
- 네트워크 및 기기의 사양에 따라 데이터 처리량 및 속도에 차이가 발생함
  - 일반적으로 데스크톱에 비해 모바일이 안 좋음
- 화면의 크기나 사용하는 기기가 바뀌어도 사이트의 크기는 바뀌지 않기 때문에 모바일 환경에서 로딩 속도가 더 느려질 수 있음

<br/>

### 원인은 이미지

- 반응형 웹을 구현할 때 화면의 크기가 작아져도 화면에 사용하는 이미지의 크기가 작아지지는 않음
- **img** 태그에 width, height 속성을 명시하지 않으면 성능을 저하시킬 수 있음
- 필요 이상의 리소스를 과도하게 내려받는 현상 유형
  - 내려받아 줄이기
  - 내려받아 숨기기
  - 화면 바깥 부분

**내려받아 줄이기**

- **img** 태그에 width, height 속성을 명시하지 않으면 성능을 저하시킬 수 있으나 반응형 웹에서는 고정 width, height를 지정할 수 없음
- 고정 값 대신 전체 화면 대비 이미지 영역의 비율 값 사용 → **유동형 이미지**
- 실제 이미지가 작아지는 건 아니기 때문에 다운로드하는 이미지의 크기는 동일
- width, height 값이 명시되어 있지 않기 때문에 실시간으로 이 값을 계산하는 과정까지 추가
- 축소 처리 추가

**내려받아 숨기기**

- 데스크톱에서는 필요하지만 모바일에서는 필요하지 않은 정보들이 존재
- 불필요한 정보 영역을 css로 display:none 처리해도 브라우저는 해당 영역에 필요한 리소스들을 다운로드함
  - 화면에 필요한 리소스 다운로드 → css로 화면 노출 여부 결정

**화면 바깥 부분**

- 화면에 보이지 않는 영역에 있는 리소스까지 다운로드

<br/>

### 반응형 이미지

- 다른 환경 조건에 반응해 그 환경에 적합한 상태로 변경해 제공하는 이미지

<br/>

### 반응형 이미지 구현 방법

1. 프론트엔드 측면
   1. 미디어 쿼리를 사용해 클라이언트 환경 파악
   2. 환경에 맞는 이미지를 요청하도록
   3. **img** 태그의 `srcset`, `picture` 태그를 사용해 구현 가능
2. 백엔드 측면
   1. 클라이언트 환경에 맞는 이미지를 선택하여 전송

**srcset과 size 속성**

[반응형 이미지 - Web 개발 학습하기 | MDN](https://developer.mozilla.org/ko/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

1. 기기 너비 확인
2. `sizes` 목록에서 어떤 미디어 조건이 가장 먼저 참인지 확인
3. 해당 미디어 쿼리에 지정된 슬롯 크기 확인
4. 슬롯과 크기가 같은 `srcset` 목록에 참조된 이미지 또는 이미지가 없는 경우 선택한 슬롯 크기보다 큰 첫 번째 이미지 로드

**srcset**

- 브라우저가 가장 적절한 이미지를 선택하도록 힌트를 주는 역할
- 사용자의 다양한 환경에 따라 다른 이미지 url 지정 가능
- 구문
  - 쉼표로 목록 구분
  - 이미지 파일 이름+공백+이미지 고유 크기
- [이미지 고유 크기](https://developer.mozilla.org/ko/docs/Glossary/Intrinsic_Size)
  - 픽셀(px)이 아닌 w단위 사용 ex. 480w
  - 1x, 2x등의 픽셀 밀도

```html
<img srcset="photo1.jpg 1x, photo2.jpg 2x" />
```

**sizes**

- 브레이크 포인트에 따른 이미지 크기 지정 가능
- 구문
  - 쉼표로 목록 구분
  - 미디어 조건+공백+미디어 조건이 참일 때 이미지가 채울 슬롯의 너비
  - 슬롯의 너비는 px 같은 절대 너비나 vw 같은 뷰포트 대비 상대 너비는 지정 가능하지만 백분율은 지정 불가능
- 마지막 미디어 조건이 없는 슬롯의 너비는 기본값
  - mdn에서는 미디어 조건이 모두 참일 때 선택되는 기본값이라고 나와 있는데, 모두 거짓일 때가 아닌지…
- 브라우저는 첫 번째 조건이 참이면 나머지 조건은 무시하므로 순서에 주의

```html
<img sizes="(max-width: 600px) 480px, 800px" />
```

**picture 태그**

- **img** 태그의 단점 보완
- 내부적으로 source 태그를 사용해 다양한 이미지 url 설정 가능
- 브라우저가 정의된 조건에 맞는 이미지만 사용하도록 강제
  - 조건에 맞지 않는 이미지는 다운로드 X
- 반드시 닫는 태그 앞에 **img** 태그를 src, alt 속성과 함께 명시해야 이미지가 표시됨

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="딸 엘바를 안고 서 있는 크리스" />
</picture>
```

**Art direction**

- 같은 이미지를 크기만 다르게 하는 것이 아닌, 이미지의 특징이나 가치가 기기 특성에 따라 표현되도록 하는 작업

**Client Hints**

[HTTP 헤더 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers#클라이언트_힌트)

[Client hints(클라이언트 힌트) - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Client_hints)

- HTTP 헤더를 통해 웹 서버에서 최적화 처리를 하는 경우 사용자 환경을 서버에 전달하는 방식
- 서버 또는 클라이언트의 Client Hints 지원 선언 필요
  - 서버: 응답 헤더에 Accept-CH 추가
  ```html
  Accept-CH: DPR, Width, Viewport-Width, Downlink
  ```
  - 클라이언트: meta 태그의 http-equiv 속성에 Accpet-CH 설정
  ```html
  <meta http-equiv="Accept-CH" content="DPR, Width, Viewport-Width, Downlink" />
  ```
- 서버의 지원이 확인되면 후속 요청에 관련 정보 헤더 추가

```html
DPR: 2.0 Width: 320 Viewport-Width: 320
```

**이미지 지연 로딩**

- 화면에 노출할 때 다운로드하도록 하는 방법
  - src: 가짜 링크, 작고 투명한 파일
  - data-src: 실제 이미지 링크

```html
<script>
function loadReal(img) {
	if (img.display != "none") {
		img.onload = null;
		img.src = img.getAttribute("data-src");
	}
}
<script>
<img src="1px.gif" data-src="book.jpb" alt="Book" onload="loadReal(this)">
```

- 스크롤 기반으로 보이는 화면에 가까이 왔을 때 다운로드하는 방식은 **img** 태그의 `loading` 속성이 지원

```html
<img src="image.jpg" alt="..." loading="lazy" />
```

<br/>

# 5. 적응형 이미지 전략

- 서버 측 반응형 웹 구현 시 필요한 이미지 호출 방식

  - 반응형 웹: 클라이언트에서 동일한 응답 다운로드 → 화면 크기에 맞게 처리
  - 서버 측 반응형 웹: 기기에 따라 적합한 컨텐츠 응답

<br/>

### 적응형 이미지 아키텍쳐

- 보통 원본 서버 앞에 필요한 정보를 수집하고 관리하는 프록시 서버 배치
- 중요한 것은 서버가 어떻게 클라이언트의 정보를 아느냐…
- `User-Agent` 헤더를 통해
  - 애플리케이션, 운영체제, 제조업체 등의 정보

```text
User-Agent: <product> / <product-version> <comment>
User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>
```

- 기기의 정보를 감지하기 위해 라이브러리나 클라우드 서비스를 사용할 수 있지만 무료는 없음

<br/>

### 기기 정보에 따라 서버 로직 수행

1. 브레이크 포인트 사전 정의 및 브레이크 포인트별 이미지 준비
2. 기기의 너비 추출
3. 추출한 너비에 적합한 이미지 로드

<br/>

### 브라우저별 이미지 전달

[Accept - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept)

- 브라우저별 이미지는 HTTP 요청 헤더 중 Accept 헤더를 통해 결정

```text
Accept: <>/<>

Accept: text/html
Accept: image/*
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

<br/>

### 캐시 고려 사항

> 💡 캐시 충돌 현상  
> 하나의 url에 여러 개의 다른 컨텐츠가 응답될 수 있을 때 먼저 응답되는 컨텐츠만 캐시되는 현상

- 적응형 이미지는 동일한 url을 사용해도 사용자 기기에 따라 서로 다른 이미지가 응답될 수 있기 때문에 캐시 충돌 현상에 주의 필요
- 응답 헤더 중 `Vary` 헤더를 통해 특정 헤더에 따라 컨텐츠가 달라질 수 있음을 캐시 서버에 알려줘야 함

```text
Vary: <header-name>, <header-name>, ...
```
