const createError = require('http-errors')

module.exports = function (originalFunc) {
  return async function (req, res, next) {
    try {
      return await originalFunc.call(this, req, res, next)
    } catch (err) {
      console.log('Catch wrap error: ', err.stack)
      next(createError(err))
    }
  }
}
