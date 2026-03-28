<div align="center">

# 🐾 다시만나유 (SeeYouAgain)

**유기동물 입양과 실종 반려동물 찾기를 위한 통합 플랫폼**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

![Mockup](https://github.com/user-attachments/assets/edfe4cd5-91af-42d4-82d6-dcd2d21f0383)

## 🎯 프로젝트 소개

**다시만나유(SeeYouAgain)** 는 유기동물 입양과 실종 반려동물 찾기를 돕는 통합 플랫폼입니다.

### 프로젝트 배경

매년 수많은 반려동물이 유기되고, 실종되는 안타까운 상황이 발생합니다. 다시만나유는 이러한 문제를 해결하기 위해:

- **유기동물에게 새로운 가족을 찾아주고**
- **실종된 반려동물과 보호자의 재회를 돕습니다**

### 특징

- 🗺️ **지도 기반 검색**: 카카오맵 API를 활용한 지역 기반 동물 정보 조회
- 💬 **실시간 채팅**: WebSocket(STOMP)을 통한 입양자-보호자 간 즉시 소통
- 📱 **푸시 알림**: Firebase FCM 기반 실시간 알림
- ♿ **접근성 고려**: Radix UI 기반의 접근 가능한 UI 컴포넌트
- 🎨 **반응형 디자인**: 모바일/태블릿/데스크톱 모두 지원
- ⚡ **최적화된 성능**: Next.js 15 + Turbopack, React Query 캐싱

> 이 레포지토리는 **다시만나유**의 **프론트엔드 전용 레포**입니다.

---

## ✨ 주요 기능

### 1. 🏠 입양 동물 조회

- 유기동물 목록 조회 (무한스크롤)
- 상세 정보 확인 (품종, 나이, 성별, 보호 장소 등)
- 북마크 기능
- 정렬 및 필터링

### 2. 🔍 실종/목격 게시판

- 실종 동물 정보 등록
- 목격 정보 제보
- 게시물 검색 및 필터링
- 신고 기능

### 3. 🗺️ 지도 기반 검색

- 카카오맵 기반 지역별 동물 위치 표시
- 마커 클릭 시 상세 정보 표시
- 지도 범위 내 동물 목록 자동 갱신

### 4. 💬 실시간 채팅

- 입양 희망자와 보호자 간 1:1 채팅
- WebSocket(STOMP) 기반 실시간 메시징
- 읽음/안읽음 상태 표시
- 무한스크롤 기반 대화 내역 조회

### 5. 🔔 알림 시스템

- Firebase FCM 푸시 알림
- 채팅 메시지, 댓글, 북마크 알림
- 브라우저 알림 권한 관리

### 6. 👤 마이페이지

- 내가 작성한 게시물 관리
- 북마크한 동물 목록
- 알림 설정
- 회원정보 수정

---

## 🛠 기술 스택

### Core

| 기술           | 버전   | 선택 이유                                 |
| -------------- | ------ | ----------------------------------------- |
| **Next.js**    | 15.5.9 | App Router, 서버 컴포넌트, Turbopack 지원 |
| **React**      | 19.1.0 | 최신 React 기능 (Actions, use 등)         |
| **TypeScript** | 5.x    | 타입 안정성, 개발 생산성 향상             |

### Styling & UI

| 기술             | 버전  | 선택 이유                    |
| ---------------- | ----- | ---------------------------- |
| **Tailwind CSS** | 4.x   | 유틸리티 우선 CSS, 빠른 개발 |
| **Radix UI**     | -     | 접근성이 보장된 Headless UI  |
| **shadcn/ui**    | -     | 커스터마이징 가능한 컴포넌트 |
| **Lucide React** | 0.548 | 가볍고 다양한 아이콘         |

### 상태 관리

| 기술               | 버전   | 선택 이유                         |
| ------------------ | ------ | --------------------------------- |
| **Zustand**        | 5.0.8  | 클라이언트 전역 상태 (간결한 API) |
| **TanStack Query** | 5.90.5 | 서버 상태 관리, 캐싱, 무한스크롤  |

### 폼 & 검증

| 기술                | 버전   | 선택 이유                   |
| ------------------- | ------ | --------------------------- |
| **React Hook Form** | 7.65   | 선언적 폼 관리, 성능 최적화 |
| **Zod**             | 4.1.12 | 타입 안전한 스키마 검증     |

### 통신

| 기술         | 버전   | 선택 이유                      |
| ------------ | ------ | ------------------------------ |
| **Axios**    | 1.12.2 | HTTP 클라이언트, 인터셉터 지원 |
| **STOMP.js** | 7.2.1  | WebSocket 메시징 프로토콜      |
| **SockJS**   | 1.6.1  | WebSocket 폴백 지원            |

### 기타

- **Firebase**: FCM 푸시 알림
- **next-auth**: 소셜 로그인 (Kakao, Google 등)
- **react-kakao-maps-sdk**: 카카오맵 API
- **date-fns**: 날짜 포맷팅
- **recharts**: 차트 시각화
- **sonner**: 토스트 알림
- **motion**: 애니메이션

---

## 📁 프로젝트 구조

```
TaetoEggen/
├── public/               # 정적 파일 (아이콘, manifest 등)
├── src/
│   ├── api/             # API 엔드포인트 함수
│   │   ├── animal.ts    # 입양 동물 API
│   │   ├── board.ts     # 게시판 API
│   │   ├── chat.ts      # 채팅 API
│   │   ├── auth.ts      # 인증 API
│   │   └── ...
│   ├── app/             # Next.js App Router
│   │   ├── (auth)/      # 인증 관련 페이지 (로그인/회원가입)
│   │   ├── adopt/       # 입양 페이지
│   │   ├── missing/     # 실종/목격 페이지
│   │   ├── map/         # 지도 페이지
│   │   ├── chat/        # 채팅 페이지
│   │   ├── mypage/      # 마이페이지
│   │   └── layout.tsx   # 루트 레이아웃
│   ├── components/      # React 컴포넌트
│   │   ├── ui/          # shadcn/ui 기본 컴포넌트
│   │   ├── layout/      # 레이아웃 컴포넌트 (Header, Sidebar 등)
│   │   └── features/    # 기능별 컴포넌트
│   │       ├── adopt/   # 입양 관련
│   │       ├── missing/ # 실종 관련
│   │       └── ...
│   ├── hook/            # 커스텀 훅
│   │   ├── adopt/       # 입양 관련 훅
│   │   ├── chat/        # 채팅 관련 훅
│   │   └── auth/        # 인증 관련 훅
│   ├── lib/             # 유틸리티 함수
│   │   ├── axios.ts     # Axios 인스턴스
│   │   └── utils.ts     # 공통 유틸
│   ├── providers/       # Context Providers
│   │   ├── AuthProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── ChatSocketProvider.tsx
│   ├── store/           # Zustand 스토어
│   │   ├── authStore.ts
│   │   ├── sidebar.ts
│   │   └── ...
│   └── types/           # TypeScript 타입 정의
│       ├── animal.ts
│       ├── board.ts
│       └── ...
├── .env.local           # 환경 변수 (git 제외)
├── .env.example         # 환경 변수 예시
├── next.config.ts       # Next.js 설정
├── tailwind.config.ts   # Tailwind CSS 설정
└── tsconfig.json        # TypeScript 설정
```

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js**: 20.x 이상
- **npm**: 10.x 이상 (또는 yarn, pnpm)
- **백엔드 서버**: API 서버가 실행 중이어야 합니다

### 환경 설정

1. **저장소 클론**

```bash
git clone https://github.com/your-username/TaetoEggen.git
cd TaetoEggen
```

2. **환경 변수 설정**

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성합니다.

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 필요한 값을 입력합니다:

```env
# API 서버 URL
NEXT_PUBLIC_API_URL="http://localhost:8080"

# 카카오 맵 API 키 (https://developers.kakao.com/console/app)
NEXT_PUBLIC_KAKAO_MAP_APP_KEY="your_kakao_map_app_key"

# Firebase 설정 (https://console.firebase.google.com/)
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
NEXT_PUBLIC_FIREBASE_VAPID_KEY="your_vapid_key"

# 휴대폰 인증 이메일 (MO 방식)
NEXT_PUBLIC_VERIFICATION_EMAIL="your-email@example.com"
```

### 설치 및 실행

1. **의존성 설치**

```bash
npm install
```

2. **개발 서버 실행**

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

3. **프로덕션 빌드**

```bash
npm run build
npm start
```

### 기타 명령어

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format

# Prettier 검사 (CI용)
npm run format:check
```

---

## 🏗 아키텍처

### 전체 아키텍처

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Browser   │─────▶│  Next.js App │─────▶│  Backend    │
│  (Client)   │◀─────│   (Frontend) │◀─────│  API Server │
└─────────────┘      └──────────────┘      └─────────────┘
      │                     │                      │
      │              ┌──────┴──────┐              │
      │              │             │              │
      ▼              ▼             ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Firebase │  │  Kakao   │  │ WebSocket│  │ Database │
│   FCM    │  │   Maps   │  │  (STOMP) │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### 데이터 흐름

```
User Action
    │
    ▼
React Component
    │
    ├─────▶ React Query (Server State)
    │            │
    │            ▼
    │       API Request (Axios)
    │            │
    │            ▼
    │       Backend Server
    │
    └─────▶ Zustand (Client State)
```

### 상태 관리 전략

- **서버 상태**: TanStack Query로 관리 (API 응답, 캐싱)
- **클라이언트 상태**: Zustand로 관리 (UI 상태, 사용자 설정)
- **폼 상태**: React Hook Form으로 관리 (로컬 폼 상태)

---

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드, 설정 파일 수정
```

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
