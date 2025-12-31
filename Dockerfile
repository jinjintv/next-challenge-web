# 1. 빌드 이미지
FROM golang:1.21-alpine AS builder

# 작업 디렉토리
WORKDIR /app

# pocketbase 소스 전체를 컨테이너로 복사
COPY pocketbase/ ./pocketbase/

# pocketbase 디렉토리로 이동
WORKDIR /app/pocketbase

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:latest

WORKDIR /app

# 빌드 결과물과 데이터 폴더 복사
COPY --from=builder /app/pocketbase/pocketbase ./
COPY --from=builder /app/pocketbase/pb_data ./pb_data

# 포트 오픈
EXPOSE 8090

# PocketBase 서버 실행
CMD ["./pocketbase", "serve", "--http", ":8090"]
