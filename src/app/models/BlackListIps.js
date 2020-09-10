import Sequelize, { Model } from 'sequelize';

class BlacklistIps extends Model
{
  static init(sequelize)
  {
    super.init(
      {
        host: Sequelize.STRING,
        accept: Sequelize.STRING,
        x_real_ip: Sequelize.STRING,
        connection: Sequelize.STRING,
        user_agent: Sequelize.STRING,
        x_forwarded_for: Sequelize.STRING,
        x_forwarded_photo: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default BlacklistIps;
