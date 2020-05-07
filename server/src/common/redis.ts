import Redis, { RedisOptions } from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";

// TODO: fill this for production
const options: RedisOptions = {};

export const redis = new Redis(options);

export const pubSubRedis = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});
