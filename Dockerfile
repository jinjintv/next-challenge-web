# 1. 빌드 이미지
FROM golang:1.21-alpine AS builder

WORKDIR /app

# 전체 pocketbase 소스를 컨테이너에 복사
COPY pocketbase/ ./pocketbase/

WORKDIR /app/pocketbase

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:latest

WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/pocketbase/pocketbase ./
COPY --from=builder /app/pocketbase/pb_data ./pb_data

# 포트 오픈
EXPOSE 8090

# PocketBase 서버 실행
CMD ["./pocketbase", "serve", "--http", ":8090"]
