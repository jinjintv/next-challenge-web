# 1. 베이스 Go 이미지
FROM golang:1.21 AS builder

WORKDIR /app

# go.mod, go.sum 복사 후 의존성 설치
COPY go.mod go.sum ./
RUN go mod download

# 나머지 소스 복사
COPY . .

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /app/pocketbase ./pocketbase

EXPOSE 8090
CMD ["./pocketbase", "serve", "--http", ":8090"]
