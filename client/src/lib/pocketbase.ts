import PocketBase from "pocketbase";

const pb = new PocketBase('https://remarkable-enthusiasm.railway.app');

// React strict mode + route 이동 시 요청 취소 방지
pb.autoCancellation(false);

export default pb;
