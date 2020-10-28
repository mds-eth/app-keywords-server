import Bull from 'bull';

import redisConfig from '../config/redis';

import * as jobs from '../jobs';

import ModelLogErrors from '../app/models/LogErrors';

import ModelFailedJobs from '../app/models/FailedJobs';
import ModelFinishedJobs from '../app/models/FinishedJobs';

class Queue
{
  constructor()
  {

    const { port, host, password } = redisConfig;

    this.queues = Object.values(jobs).map((job) => ({
      bull: new Bull(job.key, { redis: { port, host, password } }),
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
          const { name, token } = job.queue;
          const { attemptsMade: attempts_made, processedOn: processed_on, finishedOn: finishd_on } = job;

          const keyJob = job.queue.name;

          const uuid = job.data.uuid;
          const params = job.data;

          await ModelFailedJobs.create({ uuid, job: keyJob, params, error: error.stack });
        });

        queue.bull.on('completed', async (job, result) =>
        {

          const { name, token } = job.queue;
          const { attemptsMade: attempts_made, processedOn: processed_on, finishedOn: finishd_on } = job;

          const keyJob = job.queue.name;

          const uuid = job.data.uuid;
          const params = job.data;

          await ModelFinishedJobs.create({ uuid, job: keyJob, params });
        });
      });

    } catch (error) {
      await ModelLogErrors.create({ uuid: '', params: '', error: error.stack });
      return false;
    }
  }
}

export default new Queue();
