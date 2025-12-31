# 1. Builder 단계: PocketBase 빌드
FROM golang:1.23-alpine AS builder

# 필요한 패키지 설치
RUN apk add --no-cache git

# 작업 디렉토리 설정
WORKDIR /app/pocketbase

# go.mod, go.sum 먼저 복사하여 캐시 활용
COPY pocketbase/go.mod pocketbase/go.sum ./

# 모듈 다운로드
RUN go mod download

# 소스 전체 복사
COPY pocketbase/ .

# 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. Runtime 단계: 경량 이미지
FROM alpine:latest

# 필요한 패키지 설치 (네트워크 사용)
RUN apk add --no-cache ca-certificates

# 작업 디렉토리
WORKDIR /app/pocketbase

# Builder에서 빌드된 binary만 복사
COPY --from=builder /app/pocketbase/pocketbase ./

# 포트 오픈
EXPOSE 8090

# 실행
CMD ["./pocketbase", "serve", "--http", ":8090"]
