---
title: '직렬화와 역직렬화'
summary: redux에서 만난 serialization을 nextjs에서 또 만났다.
date: '2023-11-13'
draft: true
tags: []
images: []
---

# 들어가며

redux를 처음 공부할 때 serialization과 관련된 에러를 몇 번 본 적이 있다. 그당시에 온전한 객체 형태를 전달하면 된다는 것만 알고 넘어가고, 직렬화가 무엇인지, non-serializable value는 또 어떤 걸 의미하는지 제대로 공부하지 못했다. 그러던 중 최근에 nextjs 문서에서도 직렬화 관련 문장을 발견하게 되었다.

어렴풋이 알고만 넘어갔던 게 걸려서 이참에 직렬화가 무엇인지, 또 여러 모듈에서 왜 non-serializable value는 사용하면 안 되는지 짚어보고자 한다.

# 직렬화

위키백과에서는 직렬화를 이렇게 설명하고 있다.

데이터 스토리지 문맥에서 데이터 구조나 오브젝트 상태를 동일하거나 다른 컴퓨터 환경에 저장하고 나중에 재구성할 수 있는 포맷으로 변환하는 과정을 뜻한다. 오브젝트를 직렬화하는 과정은 `마샬링`한다고도 하며, 반대로 일련의 바이트로부터 데이터 구조를 추출하는 일은 역직렬화 또는 디시리얼라이제이션(deserialization)이라고 한다.

설명만 봐서는 아직 직렬화가 정확히 어떤 걸 의미하는지, 왜 하는지 잘 모르겠다 🫠

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/13e165f9-1e12-471d-bcc5-130f4119f051/f3ec2ec5-1ea4-4663-99cc-8284e3a265af/Untitled.png)

# 왜 직렬화가 필요할까?

## 메멘토 패턴

## 프록시 패턴

### ref.

참고
[OKKY - 직렬화 하는 이유가?](https://okky.kr/questions/224715)
