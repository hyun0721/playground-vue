# 1단계: 빌드
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2단계: Nginx로 정적 파일 서빙
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# SPA 라우팅 지원을 위한 nginx.conf 복사 (nginx.conf 파일도 함께 생성 필요)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 