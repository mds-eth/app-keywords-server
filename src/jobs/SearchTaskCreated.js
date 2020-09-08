import BaseService from '../app/service/BaseService';

import ModelLogErrors from '../app/models/LogErrors';
import DataForSeoService from '../app/service/DataForSeoService';
import TasksCreatedService from '../app/service/TasksCreatedService';

class JobSearchTasksCreated
{
  constructor()
  {
    this.key = 'JobSearchTasksCreated';
    this.options = {
      attemps: 1
    };
  }

  async handle(values)
  {
    const { uuid } = values.data;

    const auth = await DataForSeoService.getAuthEncodeApiForSeo();

    const headers = {
      Authorization: `Basic ${auth}`,
    };

    const tasks = await TasksCreatedService.getTasksCreated(uuid);

    try {

      for (var i in tasks) {

        const task = tasks[i];

        const url = `${process.env.API_FOR_SEO}v3/serp/google/organic/task_get/advanced/${task.uuid_task}`;

        const response = await BaseService.callAPI('GET', '', url, '', headers, uuid);

        if (!response) continue;

        if (response.status === 200) {

          const data = response.data;
        }
      }
    } catch (error) {
      await ModelLogErrors.create({ uuid, params: values, error: error.stack });
      return false;
    }
  }
}

export default new JobSearchTasksCreated();
