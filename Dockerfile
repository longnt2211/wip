FROM node:14-slim

# setup okteto message
COPY bashrc /root/.bashrc

WORKDIR /usr/src/app

ADD package.json .
RUN npm install
RUN npm install -i
RUN npm i nodemon
# COPY index.js .

EXPOSE 3000

#CMD npm start
CMD nodemon src/app.js
