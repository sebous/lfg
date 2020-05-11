import { redis } from "../redis";
import { CHAT_REDIS_STORE } from "../../types/chat";

export async function clearChat() {
  await redis.del(CHAT_REDIS_STORE);
}
