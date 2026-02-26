# 다시만나유 (SeeYouAgain) — Frontend

## 1. 프로젝트 소개

**다시만나유(SeeYouAgain)** 는 유기동물을 입양하거나 실종된 반려동물을 찾기 위한 서비스입니다. 이 레포지토리는 **다시만나유**의 **프론트엔드 전용 레포**로, UI 구현과 API 연동, 상태/서버 상태 관리, 인증 및 공통 UI 구성을 담당합니다.

---

## 2. 주요 기능

- 유기동물 입양 관련 화면 및 데이터 조회
- 실종 반려동물 정보 탐색/조회 및 관련 화면 구성
- 실종/목격 정보를 게시할 수 있는 게시판 구성
- 상대방과 자유롭게 채팅할 수 있는 채팅

---

## 3. 기술 스택

- **Framework**: Next.js (App Router) + TypeScript
- **Styling/UI**: Tailwind CSS, shadcn/ui, lucide-react
- **Form**: react-hook-form, zod
- **State**: zustand
- **Server State**: TanStack Query (@tanstack/react-query), Devtools
- **HTTP**: axios
- **Auth**: next-auth
- **Chart**: recharts
- **Utils**: date-fns
- **Notification**: sonner

---

## 4. 프로젝트 구조

- `src/api` : 각 페이지별 api 정의
- `src/app` : 라우팅(페이지), 레이아웃, 서버/클라이언트 컴포넌트
- `src/components` : 공용 컴포넌트, UI 구성요소
- `src/hooks` : 커스텀 훅(도메인별)
- `src/lib` : axios 인스턴스, 유틸, stomp/ws 클라이언트 등
- `src/store` : zustand 스토어
- `src/types` : 타입 정의

---

## 5. 실행 방법

### 5.1. 설치 및 실행

```bash
npm install
npm run dev
```


