module.exports = {
  apps: [
    {
      name: 'api_keywords',
      script: 'build/server.js',
      instances: '1',
      autorestart: true,
      watch: false,
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
      script: 'build/queue.js',
      instances: '1',
      autorestart: true,
      watch: false,
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
