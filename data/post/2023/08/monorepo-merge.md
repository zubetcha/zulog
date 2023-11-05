---
title: '[모노레포] 기존 프로젝트 안전하게 병합하기'
category: monorepo
date: 2023-08-03
description: 모노레포를 구축하면서 겪은 시행착오 시리즈 1
published: true
slug: how-to-merge-into-monorepo
tags:
  - 모노레포
---

# 들어가며

회사에 들어온지도 벌써 반년이라는 시간이 지났다.

반년이라는 시간 동안 기존에 있던 프로젝트의 유지보수 업무에 투입되기도 했었지만 가장 메인으로 맡았던 업무는 `모노레포` 구축이었다. 셀 리더님은 나의 이력서에 있던 전 회사에서의 모노레포 구축 경험을 보고 채용하기로 했다고 말씀하신 적도 있었다. 그래서 입사하자마자 가장 먼저 한 일이 모노레포 구축에 사용할 task 관리 툴과 패키지 관리 툴 기술 조사였다.

하지만 전 회사에서 모노레포를 구축할 때와 현재 회사에서 모노레포를 구축하는 상황에는 큰 차이가 있었다. 전 회사에서는 모노레포 구조를 먼저 구축한 후 새로운 프로젝트를 생성했었다면, 현재 회사는 이미 만들어져 있고 운영되고 있는 기존의 프로젝트들을 모노레포에 병합해야 한다는 점이었다.

<br/>

# 👷🏻‍♀️ 안전하게

여기서 말하는 `'안전하게'`는 1) 기존의 git 히스토리를 유지하고, 2) 멀티레포로 되어 있던 각 프로젝트의 파일들이 충돌하거나 꼬이지 않도록 을 의미한다.

병합할 프로젝트가 없을 때에는 위의 두 가지 사항을 전혀 고려할 필요가 없다. 히스토리 자체가 없고, 각 폴더 안의 알맞은 위치에 새로운 프로젝트를 생성해주면 그만이기 때문이다. 하지만 기존에 멀티레포로 흩어져 있던 여러 프로젝트들을 합치는 과정에서는 반드시 고려해야 하는 사항들이다.

## Ctrl C + Ctrl V ?

우선 **2) 충돌하거나 꼬이지 않도록** 하는 건 단순히 프로젝트 폴더를 원하는 위치에 두면 가능하다.

모노레포로 사용할 임시 폴더를 생성한 후 원하는 위치에 그대로 옮기고,

<br/>

<p align="center">
  <img src="https://github.com/zubetcha/dev-book-cheat-sheet/assets/91620721/183fa763-452c-4b3f-8ca9-e58168d85b70" width="60%" alt="모노레포 폴더 구조" />
</p>

<br/>

에디터에서 확인해보면 내가 커밋한 이력들이 잘 보인다. 과연 잘 옮겨졌을까?

<p align="center">
  <img src="https://github.com/zubetcha/monorepo-ez-script/assets/91620721/476278f6-3c2b-44da-b4a2-730cbecb7810" width="80%" alt="" />
</p>

<br/>

## git 로그 확인

git에서의 로그(혹은 히스토리)는 [git log](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EC%BB%A4%EB%B0%8B-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0) 또는 [git reflog](https://git-scm.com/docs/git-reflog) 명령어를 통해 확인이 가능하다. `git log`는 일반적으로 커밋 히스토리를 확인하기 위해 사용하는 명령어이며, `git reflog`는 git reset, git rebase 명령어로 삭제된 커밋을 포함하여 모든 커밋 히스토리를 확인할 수 있는 명령어이다. 루트에서 git reflog 명령어를 실행해보자.

<br/>

```shell
// monorepo-merge-sample/

$ git reflog

fatal: your current branch 'main' does not have any commits yet
```

분명 위에서는 에디터에서 커밋 내용을 확인할 수 있었는데, 커밋 히스토리를 확인해보면 현재 브랜치에 어떠한 커밋도 없다고 나온다. 명령어 실행 위치를 각 어플리케이션 폴더로 옮긴 후 다시 실행해보자.

```shell
// monorepo-merge-sample/apps/monorepo-ez-script

$ git reflog

0ac65e0 (HEAD -> main, origin/main, origin/HEAD) HEAD@{0}: commit: chore: edit dev script
af093da HEAD@{1}: clone: from github.com:zubetcha/monorepo-ez-script.git
```

```shell
// monorepo-merge-sample/apps/zulog

$ git reflog

db19f87 (HEAD -> develop, origin/develop) HEAD@{0}: commit: readme 수정
fa0eebc HEAD@{1}: commit: 이력서 수정
b2a234e HEAD@{2}: commit: 이력서 수정
fab1784 HEAD@{3}: commit: serverless function try-catch 추가
5a15e7d HEAD@{4}: commit: serverless function 테스트
.
.
.
```

<br/>

위치를 옮긴 후 확인해보면 각 레포지토리마다의 커밋 히스토리들이 잘 확인된다. 즉, 물리적으로 멀티레포를 모노레포 안으로 옮기는 건 단순히 멀티레포의 위치를 변경하는 것뿐이며 모노레포에 병합이 되는 건 아님을 의미한다. 이 부분은 vscode의 git 관련 익스텐션에서도 확인할 수 있다. 내가 사용하는 git graph에서는 각각의 폴더를 각기 다른 git 레포지토리로 인식하고 있다.

<br/>

<img src="https://github.com/zubetcha/blog-post/assets/91620721/a1054816-f5c2-49e5-a85f-d5d55075ad04" width="100%" alt="git graph 화면" />
<img src="https://github.com/zubetcha/blog-post/assets/91620721/0ed79efd-d923-427d-a2c7-43983c153240" width="100%" alt="git graph 화면" />
<img src="https://github.com/zubetcha/blog-post/assets/91620721/16d11037-782f-4b1c-a916-3948a2cc36ab" width="100%" alt="git graph 화면" />

<br/>

# git

## git merge

몇 차례 `병합`이라는 단어를 썼는데, git에서 관리되는 히스토리를 합치는 올바른 방법은 `git merge`를 사용하는 것이다. 하지만 멀티레포를 있는 그대로 git merge를 하면 같은 위치에 동일한 이름을 가진 파일들이 충돌하게 된다.

병합할 레포지토리를 clone한 후 그대로 merge 해보자.

```shell
// 병합할 레포지토리
$ git clone https://github.com/zubetcha/blog-post.git

// 모노레포에서 병합할 레포지토리를 remote 레포지토리로 등록
$ git remote add origin /Users/zuhye/study/monorepo/blog-post

// merge
$ git fetch origin
$ git merge origin/main --allow-unrelated-histories

Auto-merging .gitignore
CONFLICT (add/add): Merge conflict in .gitignore
Auto-merging .prettierrc
CONFLICT (add/add): Merge conflict in .prettierrc
Auto-merging README.md
CONFLICT (add/add): Merge conflict in README.md
Auto-merging package.json
CONFLICT (add/add): Merge conflict in package.json
Auto-merging tsconfig.json
CONFLICT (add/add): Merge conflict in tsconfig.json
Automatic merge failed; fix conflicts and then commit the result.
```

## git mv

충돌을 피하는 단순하지만 확실한 방법은 병합한 레포지토리들이 있어야 할 알맞은 위치로 merge 하는 것이다. 그러려면 merge 하기 전에 먼저 원하는 폴더 구조로 옮겨야 한다. [git mv](https://git-scm.com/docs/git-mv)를 사용하면 파일 및 폴더 등을 원하는 위치로 옮길 수 있다.

# 옮기기

안전하게 옮기는 과정을 순서대로 살펴보면,

1. 병합할 멀티레포를 로컬에 clone

```shell
$ git clone <repo>
```

<br/>

2. clone한 프로젝트 루트에서 원하는 위치 및 이름의 폴더 생성

예를 들어, 병합할 레포지토리 이름이 project-a 이고, 모노레포에서 apps라는 폴더에서 관리하고 싶다면 apps/project-a를 만든다. 만약 모노레포에서는p project-b로 만들고 싶다면 apps/project-b로 폴더명을 바꿔도 된다. 패키지 매니저에 따라 package.json의 name 필드가 아닌 폴더명으로 workspace 이름을 인식하는 경우도 있기 때문에 신중하게 정하는 것이 좋다.

```shell
$ mkdir apps
$ cd apps
$ mkdir <proejct name>
```

<br/>

3. 파일 및 폴더 이동

아래의 명령어로 멀티레포에 있던 파일과 폴더들을 2번에서 생성한 폴더로 이동시킨다. 만약 생성한 폴더 구조가 apps/project 처럼 한 뎁스보다 깊다면, grep에는 가장 바깥의 부모 폴더 이름만 적는다.

```shell
$ ls -a1 | grep -v ^apps | xargs -I{} git mv {} apps/<project name>
```

잘 옮겨졌다면 아래 화면과 같이 구조가 바뀐다.

<p align="center">
  <img src="https://github.com/zubetcha/zubetcha-blog/assets/91620721/c655b6de-3fdf-4f24-8d37-acf8f6eabc9b" width="50%" alt="멀티레포 이동 후 구조" />
</p>

<br/>

4. commit

위치 변경한 내용에 대해서 커밋한다.

```shell
$ git add .
$ git commit -m ""
```

<br/>

5. clone한 멀티레포를 모노레포의 remote 레포지토리에 추가

모노레포로 돌아와서 폴더 이동 후 커밋까지 완료한 멀티레포의 로컬 경로를 이용해서 모노레포의 remote 레포지토리에 추가한다. 멀티레포의 로컬 경로는 멀티레포의 루트에서 pwd를 입력하면 알 수 있다.

```shell
$ git remote add <project name> <local path>
```

<br/>

6. fetch 및 merge

remote 레포지토리에 추가한 멀티레포를 fetch하고 히스토리를 트래킹하고 싶은 브랜치를 merge한다.

```shell
$ git fetch <project name>
$ git merge <project name>/<branch> --allow-unrelated-histories
```

병합이 잘 됐다면 충돌 없이 모노레포에서도 변경해놨던 폴더 구조 그대로 보여진다.

<p align="center">
  <img src="https://github.com/zubetcha/zubetcha-blog/assets/91620721/3aff36be-efb4-4927-bd51-30a190573a4d" width="50%" alt="모노레포 병합 후 구조" />
</p>

<br/>

7. commit

병합한 변경사항을 커밋하고 모노레포의 원격 레포지토리에 push한다. 이 때, 태그도 push해야 멀티레포에 있던 태그들도 모노레포에 합쳐진다.

```shell
$ git add .
$ git commit -m ""
$ git push
$ git push -u origin --tags
```
