# --- Build stage ---
FROM golang:1.21-alpine AS builder
WORKDIR /app

# Go 모듈 캐싱
COPY go.mod go.sum ./
RUN go mod download

# 소스 전체 복사
COPY . .

# PocketBase 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# --- Runtime stage ---
FROM alpine:3.18
WORKDIR /app

# 빌드된 바이너리와 public 폴더만 복사
COPY --from=builder /app/pocketbase /app/
COPY --from=builder /app/public /app/public

# Railway는 동적으로 할당되는 포트 사용
EXPOSE $PORT

# CMD에 $PORT 넣기
CMD ["./pocketbase", "serve", "--http", ":$PORT"]
