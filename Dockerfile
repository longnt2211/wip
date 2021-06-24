FROM node:16-slim

# setup okteto message
COPY bashrc /root/.bashrc

WORKDIR /usr/src/app

#ADD package.json .
RUN npm install
RUN npm install -i
RUN npm i nodemon
COPY app.js .

EXPOSE 3000

#CMD npm start
CMD nodemon src/app.js
