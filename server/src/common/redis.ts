import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";

const url = process.env.NODE_ENV === "production" ? process.env.REDIS_URL : undefined;

export const redis = new Redis(url);

export const pubSubRedis = new RedisPubSub({
  publisher: new Redis(url),
  subscriber: new Redis(url),
});
