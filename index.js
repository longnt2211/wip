require('dotenv').config()
const createError = require('http-errors')
const debug = require('debug')('po-tool-be-api:server')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(require('./libs/LoadRoutes')(
  path.join(__dirname, './routes'),
  true
))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({
    error: err.message
  })
})

app.listen(config.port, () => {
  console.log('================================Server started: ================================')
  console.log(`Server listening on port ${config.port}`)
  console.log('================================================================================')
})
app.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const port = config.port
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
})
app.on('listening', () => {
  const addr = app.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
})
