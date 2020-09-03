import Queue from 'bull';

import redisConfig from '../config/redis';

import * as jobs from '../jobs';

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, { redis: { port: redisConfig.port, host: redisConfig.host, password: redisConfig.password } }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log(`Failed process job: ${job}, error: ${err}`);
      });
    });
  },
};
