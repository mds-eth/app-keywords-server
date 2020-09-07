import ModelTaskCreatedIds from '../models/TaskCreatedIds';

class TasksCreated
{

  async getTasksCreated(uuid)
  {

    try {
      const response = await ModelTaskCreatedIds.findAll({
        where: { uuid }
      });

      return response;

    } catch (error) {
      console.log(error);
    }
  }
}

export default new TasksCreated();