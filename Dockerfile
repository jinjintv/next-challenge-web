# 1. Go 빌드용 이미지
FROM golang:1.21-alpine AS builder

# 필요한 패키지 설치
RUN apk add --no-cache git

# PocketBase 소스 복사
WORKDIR /app
COPY pocketbase/ ./pocketbase/

# 빌드
WORKDIR /app/pocketbase
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/pocketbase/pocketbase ./pocketbase
COPY --from=builder /app/pocketbase/public ./pocketbase/public

EXPOSE 8090
CMD ["./pocketbase", "serve", "--http", ":8090"]
