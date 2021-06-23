'use strict'
const catchWrap = require('../../middlewares/CatchWrapMiddleware')
const AuthenticationMiddleware = require('../../middlewares/AuthenticationMiddleware')
const TeamController = require('../../controllers/TeamManagement/TeamController')

module.exports = function (router) {
  router.get(
    '/team-management/team',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(TeamController.searchTeam)
  )

  return router
}
