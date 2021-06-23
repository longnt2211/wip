'use strict'

const catchWrap = require('../../middlewares/CatchWrapMiddleware')
const AuthenticationMiddleware = require('../../middlewares/AuthenticationMiddleware')
const SkillPolicyController = require('../../controllers/PoManagement/SkillPolicyController')

module.exports = function (router) {
  router.get(
    '/po-management/skill-policy',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(SkillPolicyController.getAll)
  )
  // insert
  router.post(
    '/po-management/skill-policy',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(SkillPolicyController.save)
  )
  // load details
  router.get(
    '/po-management/skill-policy-details',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(SkillPolicyController.getDetails)
  )
  // update
  router.put(
    '/po-management/skill-policy',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(SkillPolicyController.update)
  )
  // update
  router.delete(
    '/po-management/skill-policy',
    catchWrap(AuthenticationMiddleware.checkToken),
    catchWrap(SkillPolicyController.delete)
  )
  return router
}
