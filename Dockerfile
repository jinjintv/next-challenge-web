# 1. PocketBase 빌드 환경
FROM golang:1.21 AS builder

WORKDIR /app

# pocketbase 소스 복사
COPY ./pocketbase ./pocketbase

WORKDIR /app/pocketbase
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM ubuntu:22.04

WORKDIR /app

# 빌드한 PocketBase 바이너리 복사
COPY --from=builder /app/pocketbase/pocketbase ./pocketbase

# 포트 오픈
EXPOSE 8090

# PocketBase 실행
CMD ["./pocketbase", "serve", "--http", ":8090"]
