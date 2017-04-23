module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'MercadoLibre',
      script    : 'main.js',
      "exec_mode"  : "cluster",
      "instances": 0,
      watch: true,
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    //{
    //  name      : 'WEB',
    //  script    : 'web.js'
    //}
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      port: '2222',
      host : '172.17.0.1',
      ref  : 'origin/master',
      repo : 'https://github.com/orlandobrea/mercadolibre.git',
      path : '/var/www/production',
      //'pre-setup': 'apt-get update && apt-get install -y git build-essential libssl-dev curl && curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh && source /root/.profile && nvm install v6.10.2 && nvm use v6.10.2',
      'pre-setup': 'rm -Rf /var/www/production ',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '172.17.0.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
