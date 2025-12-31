import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// React strict mode + route 이동 시 요청 취소 방지
pb.autoCancellation(false);

export default pb;
