import Sequelize, { Model } from 'sequelize';

class TaskCreatedIds extends Model
{
  static init(sequelize)
  {
    super.init(
      {
        uuid: Sequelize.STRING,
        uuid_task: Sequelize.STRING,
        data: Sequelize.JSON
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default TaskCreatedIds;
