'use strict'

const SkillPolicyService = require('../../services/PoManagement/SkillPolicyService')
const { SkillPolicyModel, sequelize } = require('../../models')
const { skillsMessage } = require('../../const/messages')
module.exports = class SkillPolicyController {
  // get list
  static async getAll (req, res) {
    const service = new SkillPolicyService(SkillPolicyModel)
    const data = await service.getAll()
    // no need try catch, because this action is handled at CatchWrapMiddleware
    res.send({
      code: 200,
      data
    })
  }

  // get details
  static async getDetails (req, res) {
    const { id } = req.query
    if (!id) {
      res.send(skillsMessage.REQUIRED_POLICY_ID)
    }
    const service = new SkillPolicyService(SkillPolicyModel)
    const data = await service.getDetails(id)
    // no need try catch, because this action is handled at CatchWrapMiddleware
    res.send({
      code: 200,
      data
    })
  }

  // save
  static async save (req, res, next) {
    // validation
    const {
      policy_name,
      description,
      levels
    } = req.body
    if (!policy_name) {
      res.send(skillsMessage.REQUIRED_POLICY_NAME)
    }

    // process
    const trans = await sequelize.transaction()
    try {
      const service = new SkillPolicyService(SkillPolicyModel)
      const result = await service.save({
        policy_name,
        description,
        levels: levels,
        create_time: new Date().getTime(),
        creater: 'admin',
        update_time: new Date().getTime(),
        updater: 'admin'
      }, { transaction: trans })

      // commit
      await trans.commit()
      // return data
      res.send({
        code: 200,
        data: result
      })
    } catch (err) {
      // rollback
      await trans.rollback()
      // throw exception to src\middlewares\CatchWrapMiddleware.js
      // CatchWrapMiddleware will write log
      throw new Error(err)
    }
  }

  // save
  static async update (req, res, next) {
    // validation
    const {
      id,
      policy_name,
      description,
      levels
    } = req.body
    if (!id) {
      res.send(skillsMessage.REQUIRED_POLICY_ID)
    }
    if (!policy_name) {
      res.send(skillsMessage.REQUIRED_POLICY_NAME)
    }

    // process
    const trans = await sequelize.transaction()
    try {
      const service = new SkillPolicyService(SkillPolicyModel)
      const result = await service.update({
        id,
        policy_name,
        description,
        levels: levels,
        update_time: new Date().getTime(),
        updater: 'admin'
      }, { transaction: trans })

      // commit
      await trans.commit()
      // return data
      res.send({
        code: 200,
        data: result
      })
    } catch (err) {
      // rollback
      await trans.rollback()
      // throw exception to src\middlewares\CatchWrapMiddleware.js
      // CatchWrapMiddleware will write log
      throw new Error(err)
    }
  }

  // get details
  static async delete (req, res) {
    const { id } = req.body
    if (!id) {
      res.send(skillsMessage.REQUIRED_POLICY_ID)
    }
    const service = new SkillPolicyService(SkillPolicyModel)
    const data = await service.delete(id)
    // no need try catch, because this action is handled at CatchWrapMiddleware
    res.send({
      code: 200,
      data
    })
  }
}
