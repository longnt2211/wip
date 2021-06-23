'use strict'
const catchWrap = require('../../middlewares/CatchWrapMiddleware')
const AuthenticationMiddleware = require('../../middlewares/AuthenticationMiddleware')
const StaffController = require('../../controllers/StaffManagement/StaffController')

module.exports = function (router) {
  // /staff-management/staff?yid=nntanh&full_name=Nguy%C3%AAn&tag_id_json=java&dept_id=2&team_ids=1,2&from=2020-09-29&to=2029-09-29&limit=200&offset=0
  router.get(
    '/staff-management/staff',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(StaffController.get)
  )

  // Create a staff
  router.post(
    '/staff-management/staff',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(StaffController.registry)
  )

  // Update a staff
  router.put(
    '/staff-management/staff',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(StaffController.edit)
  )

  // Delete a staff
  /**
   * /staff-management/staff?yid=abc
   */
  router.delete(
    '/staff-management/staff',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(StaffController.delete)
  )

  return router
}
