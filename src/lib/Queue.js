import Bull from 'bull';

import redisConfig from '../config/redis';

import * as jobs from '../jobs';

class Queue {
  constructor() {

    this.queues = Object.values(jobs).map((job) => ({
      bull: new Bull(job.key, { redis: { port: redisConfig.port, host: redisConfig.host, password: redisConfig.password } }),
      name: job.key,
      handle: job.handle,
      options: job.options
    }));

    this.process();
  }

  async add(name, data) {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue.bull.add(data, queue.options);
  }

  async process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log(err);
        return;
        console.log(`Failed process job: ${job}, error: ${err}`);
      });
    });
  }
}

export default new Queue();
