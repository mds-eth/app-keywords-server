require('dotenv/config');

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  timezone: 'America/Sao_Paulo',
  dialectOptions: {
    timezone: 'local',
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
