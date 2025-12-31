# 1. Go 빌드용 이미지
FROM golang:1.21-alpine AS builder

# PocketBase 소스 복사
WORKDIR /root/project/pocketbase
COPY pocketbase/ ./ 

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM alpine:latest
WORKDIR /root/project
COPY --from=builder /root/project/pocketbase/pocketbase ./pocketbase

EXPOSE 8090
CMD ["./pocketbase", "serve", "--http", ":8090"]
