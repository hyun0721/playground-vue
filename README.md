# PlayGround (Vue)

이 프로젝트는 Vite를 사용하여 생성된 Vue.js 애플리케이션입니다.

## Technical Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Core** | vue | ^3.4.21 |
| | vue-router | ^4.3.0 |
| | pinia | ^2.1.7 |
| | vite | ^5.2.8 |
| | typescript | ~5.4.0 |
| **Testing** | vitest | ^1.4.0 |
| | @playwright/test | ^1.4.0 |
| | @vue/test-utils | ^2.4.5 |
| **Linting & Formatting** | eslint | ^8.57.0 |
| | prettier | ^3.2.5 |
| **Styling** | sass | ^1.89.2 |

## Scripts

- `dev`: 개발 서버를 시작합니다.
- `build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `preview`: 프로덕션 빌드를 미리 봅니다.
- `test:unit`: Vitest로 단위 테스트를 실행합니다.
- `test:e2e`: Playwright로 종단 간 테스트를 실행합니다.
- `lint`: ESLint로 소스 코드를 린트합니다.
- `format`: Prettier로 코드 스타일을 정리합니다.

## Docker & Nginx

이 프로젝트는 애플리케이션의 컨테이너화 및 서빙을 위한 `Dockerfile`과 `nginx.conf`를 포함하고 있습니다.

### Docker

`Dockerfile`은 Vue.js 애플리케이션을 빌드한 후 Nginx를 사용하여 정적 파일을 서빙하는 멀티 스테이지 빌드로 구성되어 있습니다.

**Docker 이미지 빌드:**

```bash
docker build -t playground-vue .
```

**Docker 컨테이너 실행:**

```bash
docker run -d -p 8080:80 playground-vue
```

이제 `http://localhost:8080`에서 애플리케이션을 확인할 수 있습니다.

### Nginx

`nginx.conf` 파일은 Vue.js 애플리케이션을 서빙하고 클라이언트 사이드 라우팅을 처리하도록 설정되어 있습니다. 모든 요청을 `index.html`로 보내 Vue Router가 라우팅을 처리할 수 있도록 합니다.
