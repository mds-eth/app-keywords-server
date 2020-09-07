import Bull from 'bull';

import redisConfig from '../config/redis';

import * as jobs from '../jobs';

import ModelFailedJobs from '../app/models/FailedJobs';
import ModelFinishedJobs from '../app/models/FinishedJobs';

class Queue
{
  constructor()
  {
    this.queues = Object.values(jobs).map((job) => ({
      bull: new Bull(job.key, { redis: { port: redisConfig.port, host: redisConfig.host, password: redisConfig.password } }),
      name: job.key,
      handle: job.handle,
      options: job.options,
    }));

    this.process();
  }

  async add(name, data)
  {
    const queue = this.queues.find((queue) => queue.name === name);

    return queue.bull.add(data, queue.options);
  }

  async process()
  {

    try {

      return this.queues.forEach((queue) =>
      {
        queue.bull.process(queue.handle);

        queue.bull.on('failed', async (job, error) =>
        {
          const keyJob = job.queue.name;
          const uuid = job.data.uuid;
          const params = job.data;

          await ModelFailedJobs.create({ uuid, job: keyJob, params, error });
        });

        queue.bull.on('completed', async (job, result) =>
        {
          const keyJob = job.queue.name;

          const uuid = job.data.uuid;
          const params = job.data;

          await ModelFinishedJobs.create({ uuid, job: keyJob, params });

        });
      });

    } catch (error) {

    }
  }
}

export default new Queue();
