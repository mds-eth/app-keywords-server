module.exports = {
  apps: [
    {
      name: 'api_keywords',
      script: 'dist/server.js',
      instances: '2',
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
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
