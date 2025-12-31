# 1. Builder 단계: PocketBase 빌드
FROM golang:1.23-alpine AS builder

# 필요한 패키지 설치
RUN apk add --no-cache git

# 작업 디렉토리 설정
WORKDIR /app/pocketbase

# go.mod, go.sum 먼저 복사하여 캐시 활용
COPY pocketbase/go.mod pocketbase/go.sum ./

# 모듈 다운로드
RUN go mod download

# 소스 전체 복사
COPY pocketbase/ .

# 빌드
RUN go build -o pocketbase ./cmd/pocketbase

# 2. Runtime 단계: 경량 이미지
# ... (앞부분 동일)
FROM alpine:latest
RUN apk add --no-cache ca-certificates
WORKDIR /app/pocketbase
COPY --from=builder /app/pocketbase/pocketbase ./

# 포트는 Railway 환경변수 $PORT를 사용하도록 설정
# EXPOSE 8090은 지워도 무방합니다. Railway가 $PORT를 통해 알아서 감지합니다.
CMD ["sh", "-c", "./pocketbase superuser upsert admin@gmail.com password1234 && ./pocketbase serve --http 0.0.0.0:$PORT"]