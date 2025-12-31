# builder 단계
FROM golang:1.24-alpine AS builder

# 작업 디렉토리
WORKDIR /app/pocketbase

# go.mod, go.sum 먼저 복사
COPY pocketbase/go.mod pocketbase/go.sum ./

# 의존성 설치
RUN go mod download

# 소스 전체 복사
COPY pocketbase/ .

# 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 경량 런타임 이미지
FROM alpine:latest
WORKDIR /app/pocketbase

# 빌드 결과만 복사
COPY --from=builder /app/pocketbase/pocketbase ./
COPY --from=builder /app/pocketbase/public ./public

# 포트 오픈
EXPOSE 8090

# 실행
CMD ["./pocketbase", "serve", "--http", ":8090"]
