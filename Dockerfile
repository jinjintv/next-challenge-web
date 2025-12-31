# 1. 베이스 Go 이미지
FROM golang:1.21 AS builder

WORKDIR /app/pocketbase

# 소스 안으로 들어가서 복사
COPY pocketbase/go.mod pocketbase/go.sum ./
RUN go mod download

COPY pocketbase/ . 
RUN go build -o pocketbase ./cmd/pocketbase

# 2. 경량 런타임 이미지
FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /app/pocketbase ./pocketbase

EXPOSE 8090
CMD ["./pocketbase", "serve", "--http", ":8090"]
