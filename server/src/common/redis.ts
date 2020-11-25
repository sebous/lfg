import Redis, { RedisOptions } from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { dateReviver } from "./util/redisPubSubUtil";

const url = process.env.NODE_ENV === "production" ? process.env.REDIS_URL : undefined;

const opts: RedisOptions = {
  connectTimeout: 10000,
  reconnectOnError: () => 1,
};

export const redis = new Redis(url, opts);

export const pubSubRedis = new RedisPubSub({
  connection: opts,
  publisher: new Redis(url, opts),
  subscriber: new Redis(url, opts),
  reviver: dateReviver,
});
