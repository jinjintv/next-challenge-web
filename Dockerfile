# 1. 빌드 스테이지
FROM golang:1.23-alpine AS builder

# 작업 디렉토리
WORKDIR /app

# go.mod, go.sum 복사 후 의존성 설치
COPY go.mod go.sum ./
RUN go mod download

# PocketBase 소스 복사
COPY . .

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:3.18

# 필수 패키지 설치
RUN apk add --no-cache ca-certificates

# 작업 디렉토리
WORKDIR /app

# 빌드 결과 복사
COPY --from=builder /app/pocketbase ./pocketbase
COPY --from=builder /app/public ./public

# 포트 오픈
EXPOSE 8080

# Railway에서 PORT 환경변수 사용
ENV PB_PORT=${PORT}
ENV PB_ADDRESS=0.0.0.0

# 서버 실행
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8080"]
