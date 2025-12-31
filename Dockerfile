# 1️⃣ 빌드 스테이지 (Go + PocketBase)
FROM golang:1.23-alpine AS builder

# 필수 패키지 설치
RUN apk add --no-cache git ca-certificates

# 작업 디렉토리
WORKDIR /app/pocketbase

# 모듈 파일 먼저 복사 (캐시 활용)
COPY pocketbase/go.mod pocketbase/go.sum ./

# 의존성 설치
RUN go mod download

# PocketBase 소스 전체 복사
COPY pocketbase/ .

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2️⃣ 최종 런타임 스테이지 (경량)
FROM alpine:latest

# 필수 패키지
RUN apk add --no-cache ca-certificates tzdata

# 작업 디렉토리
WORKDIR /app/pocketbase

# 빌드 결과 복사
COPY --from=builder /app/pocketbase/pocketbase ./pocketbase
COPY --from=builder /app/pocketbase/public ./public

# 포트 오픈 (Railway는 $PORT 사용)
EXPOSE 8080

# Railway에서 $PORT 환경변수를 읽어 실행
CMD ["sh", "-c", "./pocketbase serve --http 0.0.0.0:$PORT"]
