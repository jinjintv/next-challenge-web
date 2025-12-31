# 경량 런타임 단계
FROM alpine:latest

RUN apk add --no-cache ca-certificates

WORKDIR /app/pocketbase

COPY --from=builder /app/pocketbase/pocketbase ./
COPY --from=builder /app/pocketbase/public ./public

EXPOSE 8080

# Railway 환경변수 PORT 사용
ENV PORT=8080
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:$PORT"]
