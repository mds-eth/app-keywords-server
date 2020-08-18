import Sequelize from 'sequelize';

import ModelApiForSeo from '../app/models/ApiForSeo';
import ModelLogRequestsApi from '../app/models/LogRequestsApis';
import ModelPerformanceUrls from '../app/models/PerformanceUrls';

const models = [ModelApiForSeo, ModelLogRequestsApi, ModelPerformanceUrls];

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
