module.exports = {
  apps: [
    {
      name: 'api_keywords',
      script: 'dist/server.js',
      instances: '4',
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      log_date_format: 'yyyy-MM-dd HH:mm:ss',
      error_file: '/var/logs/error_api_keywords_pm2.log',
      out_file: '/var/logs/logs_api_keywords_pm2.log',
      env: {
        NODE_ENV: 'development',
        TZ: 'America/Sao_Paulo'
      },
      env_production: {
        NODE_ENV: 'production',
        TZ: 'America/Sao_Paulo'
      }
    },
    {
      name: 'jobs_api_keywords',
      script: 'dist/queue.js',
      instances: '2',
      autorestart: true,
      watch: true,
      exec_mode: 'fork',
      log_date_format: 'yyyy-MM-dd HH:mm:ss',
      error_file: '/var/logs/error_job_api_keywords_pm2.log',
      out_file: '/var/logs/logs_job_api_keywords_pm2.log',
      env: {
        NODE_ENV: 'development',
        TZ: 'America/Sao_Paulo'
      },
      env_production: {
        NODE_ENV: 'production',
        TZ: 'America/Sao_Paulo'
      }
    }
  ]
};
