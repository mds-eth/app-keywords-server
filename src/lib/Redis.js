import RedisLib from 'redis';

class Redis {
  constructor() {
    this.redis = RedisLib.createClient();
  }
  async getValueRedisCached(key) {
    try {
      const response = await this.redis.get(key);
    } catch (error) {}
  }
}

export default new Redis();
