# po-tool-be-api
## Config For Run

copy .env.example and create .env
set the below config for database connection
```
DB_HOST=set db host here
DB_NAME=set db name here
DB_USERNAME=db user name
DB_PASSWORD=db password
```

## Build Setup
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8081
$ npm run dev

# check style
$ npm run lint

# fix style
$ npm run lint:fix

# run for testing API
http://localhost:8081/po-management/skill-policyp
```

## Structures
```
└── src
    ├── config
    ├── controllers
    ├── libs
    ├── middlewares
    ├── models
    ├── routes
    └── services
```

## Explain to each directory
| Directory | Description |
| --- | --- |
| src/config | Configuration file form application deployment |
| src/controllers | Folder contains controller files follow 3 layers architechture |
| src/libs | Folder contains common functions |
| src/middlewares | Folder contains middleware files for route protected |
| src/models | Folder contains model files follow 3 layers architechture |
| src/routers | Folder contains router files |
| src/services | Folder contains all business logic of application, and can also make calls to the data access layer |

## Explain the architechture workflow

```
                                                   Return the results
                                                +-----------------------------+
                                                |                             |
                                                |                             |
                                      +---------+-----------------------------+----------------------+
                                      |         |                             |       Middlewares    |
                                      |         |           +-----------------+------------------+   |
                                      |         |           |  Servces                           |   |
                                      |         v           |       +---------------------+      |   |
                     +------------+   |   +-------------+   |       |                     |      |   |
+--------+           |            |   |   |             |   |       |                     |      |   |
|        |  Request  |            |   |   |             |   |       |   Business Logic    |      |   |
|   APP  +---------->|   Routing  +---+-->| Controller  +---+-----> |                     |      |   |
|        |           |            |   |   |             |   |       |                     |      |   |
+--------+           |            |   |   |             |   |       +----------+----------+      |   |
      ^              +------------+   |   +----+--------+   |                  |                 |   |
      |                               |        |            |                  |                 |   |
      |                               |        |            +------------------+-----------------+   |
      |    Response                   |        |                               |                     |
      +-------------------------------+--------+             +-----------------+-----------------+   |
                                      |                      | Model           |                 |   | 
                                      |                      |                 v                 |   |
                                      |                      |         +-----------------+       |   |
                                      |                      |         |                 |       |   |
                                      |                      |         |     Tables      |       |   |
                                      |                      |         |                 |       |   |
                                      |                      |         +-------+---------+       |   |
                                      |                      |                 |                 |   |
                                      |                      +-----------------+-----------------+   |
                                      +----------------------------------------+---------------------+
                                                                               |
                                                                               v
                                                                            +--+---+
                                                                            |      |
                                                                            |  DB  |
                                                                            |      |
                                                                            +---+--+