import Sequelize from 'sequelize';

import ModelMozResults from '../app/models/MozResults';
import ModelApiForSeo from '../app/models/ApiForSeo';
import ModelFailedJobs from '../app/models/FailedJobs';
import ModelFinishedJobs from '../app/models/FinishedJobs';
import ModelLogRequestsApi from '../app/models/LogRequestsApis';
import ModelPerformanceUrls from '../app/models/PerformanceUrls';
import ModelGoogleIndexPages from '../app/models/GoogleIndexPages';

const models = [
  ModelMozResults,
  ModelApiForSeo,
  ModelFailedJobs,
  ModelFinishedJobs,
  ModelLogRequestsApi,
  ModelPerformanceUrls,
  ModelGoogleIndexPages,
];

import dbConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models.map((model) => model.init(this.connection)).map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
