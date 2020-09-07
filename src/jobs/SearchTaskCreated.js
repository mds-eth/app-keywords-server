import BaseService from '../app/service/BaseService';

import DataForSeoService from '../app/service/DataForSeoService';
import TasksCreatedService from '../app/service/TasksCreatedService';

class JobSearchTasksCreated
{
  constructor()
  {
    this.key = 'JobSearchTasksCreated';
    this.options = {
      attemps: 2,
      priority: 5
    };
  }

  async handle(values)
  {
    try {

      const { uuid } = values.data;

      const auth = await DataForSeoService.getAuthEncodeApiForSeo();

      const headers = {
        Authorization: `Basic ${auth}`,
      };

      const tasks = await TasksCreatedService.getTasksCreated(uuid);

      for (var i in tasks) {

        const task = tasks[i];

        const url = `${process.env.API_FOR_SEO}v3/serp/google/organic/task_get/advanced/${task.uuid_task}`;

        const response = await BaseService.callAPI('GET', '', url, '', headers);

        if (!response) continue;

        if (response.status === 200) {

          const data = response.data;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new JobSearchTasksCreated();
