# 1. Go 빌드용 이미지
FROM golang:1.21-alpine AS builder

# 현재 디렉토리 구조 그대로 사용
WORKDIR /root/project

# 로컬 PocketBase 소스를 컨테이너로 복사
COPY pocketbase/ ./pocketbase/

# PocketBase 빌드
RUN go build -o pocketbase ./pocketbase/cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:latest
WORKDIR /root/project

# 빌드한 PocketBase 실행 파일 복사
COPY --from=builder /root/project/pocketbase ./pocketbase

# 필요하면 static 파일도 복사
COPY pocketbase/public ./pocketbase/public

# 포트 오픈
EXPOSE 8090

# PocketBase 실행
CMD ["./pocketbase", "serve", "--http", ":8090"]
