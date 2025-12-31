# 1. 빌드 스테이지
FROM golang:1.23-alpine AS builder

WORKDIR /app

# go.mod, go.sum 복사 후 의존성 설치
COPY pocketbase/go.mod pocketbase/go.sum ./
RUN go mod download

# PocketBase 소스 복사
COPY pocketbase/ .

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:3.18
RUN apk add --no-cache ca-certificates

WORKDIR /app

# 빌드 결과 복사
COPY --from=builder /app/pocketbase ./pocketbase
COPY --from=builder /app/public ./public

EXPOSE 8080
ENV PB_PORT=${PORT}
ENV PB_ADDRESS=0.0.0.0

CMD ["./pocketbase/pocketbase", "serve", "--http", "0.0.0.0:8080"]
