'use strict'

const catchWrap = require('../../middlewares/CatchWrapMiddleware')
const AuthenticationMiddleware = require('../../middlewares/AuthenticationMiddleware')
const JobCategoryController = require('../../controllers/PoManagement/JobCategoryController')

module.exports = function (router) {
  // insert
  router.post(
    '/po-management/job-category',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(JobCategoryController.save)
  )

  // update
  router.put(
    '/po-management/job-category',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(JobCategoryController.update)
  )
  return router
}
