#!/bin/sh

cd ~/
git clone https://github.com/creationix/nvm.git .nvm
chmod 770 .nvm/nvm.sh


cd /var/www/production/current

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"


nvm install v6.10.2
nvm use v6.10.2
npm install
npm install -g pm2
pm2 reload ecosystem.config.js --env production