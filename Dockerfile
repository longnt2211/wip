FROM node:14-slim

# setup okteto message
COPY bashrc /root/.bashrc

WORKDIR /usr/src/app

ADD package.json .
RUN npm install
RUN npm install -i
RUN npm install -D lint
RUN npm run lint
COPY . .


EXPOSE 3000
CMD npm run dev

#CMD npm start
