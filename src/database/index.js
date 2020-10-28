import Sequelize from 'sequelize';


import ModelUsers from '../app/models/Users';
import ModelLogErrors from '../app/models/LogErrors';
import ModelApiForSeo from '../app/models/ApiForSeo';
import ModelMozResults from '../app/models/MozResults';
import ModelFailedJobs from '../app/models/FailedJobs';
import ModelBlackList from '../app/models/BlackListIps';
import ModelLogRequests from '../app/models/LogRequests';
import ModelRouteNotFounds from '../app/models/NotFounds';
import ModelFinishedJobs from '../app/models/FinishedJobs';
import ModelAlexaRankResults from '../app/models/AlexaRank';
import ModelLogRequestsApi from '../app/models/LogRequestsApis';
import ModelPerformanceUrls from '../app/models/PerformanceUrls';
import ModelGoogleIndexPages from '../app/models/GoogleIndexPages';

const models = [
  ModelUsers,
  ModelLogErrors,
  ModelMozResults,
  ModelApiForSeo,
  ModelFailedJobs,
  ModelBlackList,
  ModelLogRequests,
  ModelFinishedJobs,
  ModelRouteNotFounds,
  ModelLogRequestsApi,
  ModelPerformanceUrls,
  ModelAlexaRankResults,
  ModelGoogleIndexPages,
];

import dbConfig from '../config/database';

class Database
{
  constructor()
  {
    this.init();
  }

  init()
  {
    this.connection = new Sequelize(dbConfig);
    models.map((model) => model.init(this.connection)).map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
