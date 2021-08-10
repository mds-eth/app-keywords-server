import Sequelize, { Model } from 'sequelize';

class Users extends Model
{
    static init(sequelize)
    {
        super.init(
            {
                uuid: Sequelize.UUID,
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                phone: Sequelize.STRING,
                password: Sequelize.TEXT,
                company: Sequelize.TEXT,
                url_avatar: Sequelize.TEXT,
                last_access: Sequelize.DATE,
                admin: Sequelize.BOOLEAN
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Users;
