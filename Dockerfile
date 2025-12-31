# 1. Go 공식 이미지에서 빌드
FROM golang:1.21 AS builder

# 작업 디렉토리
WORKDIR /app

# 모듈 파일만 먼저 복사
COPY go.mod go.sum ./

# 의존성 설치 (캐시 활용 가능)
RUN go mod download

# 나머지 소스 복사
COPY . .

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase
