import Sequelize, { Model } from 'sequelize';

class AlexaRankResults extends Model
{
    static init(sequelize)
    {
        super.init(
            {
                uuid: Sequelize.STRING,
                domain: Sequelize.STRING,
                site_rank: Sequelize.STRING,
                top_keywords: Sequelize.JSON,
                similar_sites: Sequelize.JSON,
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default AlexaRankResults;
