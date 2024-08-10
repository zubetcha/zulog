---
title: 'Map은 정말 Object Literal보다 성능이 좋을까?'
summary:
date: '2024-08-09'
draft: true
tags: ['javascript']
images: []
---

# 들어가며,

며칠 전 프로그래머스에서 문제를 풀던 중 신기한 현상(?)을 발견했다.

hashmap을 이용해서 풀어야 하는 문제였는데 key-value 구조를 떠올렸을 때 가장 먼저 생각난 게 Object Literal(우리가 흔히 중괄호로 쓰는 그 객체)였기 때문에 적용해서 제출했으나 시간 초과로 실패하고 말았다. 그런데 로직은 그대로 남겨두고 Object Literal을 Map 객체로 바꿨더니 시간 초과가 뜨지 않고 잘 통과했다.

Object Literal이 Map 객체에 비해서 이렇게 성능이 떨어지나? 문제를 풀 때 말고 실제로 회사에서 프로그래밍을 할 때에도 Object Literal과 Map을 적재적소에 잘 사용하고 있나? 하는 반성이 들어서 찾아보았다!

> `hashmap`  
> 자료구조 중 하나로, key-value 쌍을 저장한다. key는 고유해야 하며, key를 사용해 값에 빠르게 접근할 수 있다.

<br/>

# Object Literal

# Map

# hashmap

# 마치며.
