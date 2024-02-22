import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL as string;
const redisClient = new Redis(redisUrl);

export default redisClient;
