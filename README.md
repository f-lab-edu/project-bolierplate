# Project Title

A brief description of what this project does and who it's for

## 기술 스택

React, Vanilla Extract, Storybook

## 기획
- `Vanilla Extract` 를 사용해 최소한의 스타일을 가진 `headless ui` 작성
- 컴포넌트 스타일을 원하는 CSS 도구를 이용하여 커스터 마이징할 수 있도록 확장성 있게 구현
- 각각의 컴포넌트들을 `Storybook` 을 활용하여 테스트할 수 있도록 구현
- 컴포넌트들의 동작 로직을 `custom hook` 을 이용하여 캡슐화 시켜 따로 사용할 수 있도록 구현
- 가능하다면 `npm` registry 에 배포 (각각의 컴포넌트들과 `custom hook` 들을 따로 설치할 수 있게 구성)

## 설치 방법

Install my-project with pnpm

```bash
  npm install my-project
  cd my-project
```

## 사용예시

```javascript
import Component from "my-project";

function App() {
  return <Component />;
}
```
