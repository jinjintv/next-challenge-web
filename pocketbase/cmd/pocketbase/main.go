package main

import (
    "log"
    "github.com/pocketbase/pocketbase"
)

func main() {
    app := pocketbase.New()

    // 서버 시작 (기본 HTTP 포트 8090)
    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
