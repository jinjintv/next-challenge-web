# Use official Golang image to build PocketBase
FROM golang:1.21-alpine AS builder

WORKDIR /app
# PocketBase 소스 복사
COPY . .

# Build PocketBase binary
RUN go build -o pocketbase ./cmd/pocketbase

# --- Runtime image ---
FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/pocketbase /app/
COPY --from=builder /app/public /app/public

# Expose port
EXPOSE 8090
CMD ["./pocketbase", "serve"]
