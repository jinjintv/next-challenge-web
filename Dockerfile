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
FROM alpine:latest
RUN apk add --no-cache ca-certificates

WORKDIR /app/pocketbase
COPY --from=builder /app/pocketbase/pocketbase ./

# Railway 환경변수 PORT가 없을 경우를 대비해 기본값 8080 설정
ENV PORT=8080

EXPOSE $PORT

# 데이터 폴더를 위한 볼륨 확보용 (Railway Volume과 연결 필수)
VOLUME ["/app/pocketbase/pb_data"]

# 직접 실행 방식으로 변경하여 시그널 전달 최적화
ENTRYPOINT ["./pocketbase", "serve", "--http", "0.0.0.0:8080"]