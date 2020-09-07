import redis from 'redis';

class Redis
{
  constructor()
  {
    this.init();

    this.redis = [];
  }

  async init()
  {
    try {

      const client = await redis.createClient({
        port: process.env.PORT_REDIS,
        host: process.env.HOST_REDIS,
        password: process.env.PASSWORD_REDIS,
      });

      this.redis = client;
    } catch (error) {
      console.log(error);
    }
  }

  async getCacheById(key)
  {
    return new Promise((resv, rej) =>
    {
      this.redis.get(key, (err, reply) =>
      {
        if (err) rej(false);
        resv(JSON.parse(reply));
      });
    });
  }

  async addCacheRedis(key, value)
  {
    try {
      await this.redis.set(key, value, 'EX', 21600);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Redis();
