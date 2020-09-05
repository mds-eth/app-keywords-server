import Sequelize, { Model } from 'sequelize';

class LogRequests extends Model
{
    static init(sequelize)
    {
        super.init(
            {
                method: Sequelize.STRING,
                url: Sequelize.STRING,
                body: Sequelize.JSON,
                headers: Sequelize.JSON,
                raw_headers: Sequelize.JSON,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default LogRequests;
