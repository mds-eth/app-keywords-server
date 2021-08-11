FROM node:12

# Create app directory
WORKDIR /var/www/app-keyword

COPY . .

# Install PM2
RUN npm install -g pm2  

RUN mkdir -p /var/www/app-keyword
RUN mkdir -p /var/log/app-keyword

ADD . /var/www/app-keyword

RUN npm install

EXPOSE 3010

CMD pm2 start --no-daemon  ecosystem.config.js