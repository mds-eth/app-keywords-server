import Sequelize, { Model } from 'sequelize';

class MozResults extends Model
{
  static init(sequelize)
  {
    super.init(
      {
        uuid: Sequelize.STRING,
        url: Sequelize.STRING,
        ueid: Sequelize.STRING,
        uid: Sequelize.STRING,
        upa: Sequelize.INTEGER,
        pda: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default MozResults;
