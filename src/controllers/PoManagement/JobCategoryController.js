'use strict'

const JobCategoryService = require('../../services/PoManagement/JobCategoryService')
const { JobCategoryModel, sequelize } = require('../../models')
const { jobCategoryMessage } = require('../../const/messages')
module.exports = class JobCategoryController {
  // save
  static async save (req, res, next) {
    // validation
    const {
      job_name,
      description,
      skill_id_list
    } = req.body
    if (!job_name) {
      res.send(jobCategoryMessage.REQUIRED_JOB_NAME)
    }

    // process
    const trans = await sequelize.transaction()
    try {
      const service = new JobCategoryService(JobCategoryModel)
      const result = await service.save({
        job_name,
        description,
        skill_id_list: skill_id_list,
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

  // update
  static async update (req, res, next) {
    // validation
    const {
      id,
      job_name,
      description,
      skill_id_list,
      grade_id_sort
    } = req.body

    if (!job_name) {
      res.send(jobCategoryMessage.REQUIRED_JOB_NAME)
    }

    // process
    const trans = await sequelize.transaction()
    try {
      const service = new JobCategoryService(JobCategoryModel)
      const result = await service.update({
        id,
        job_name,
        description,
        skill_id_list,
        grade_id_sort,
        update_time: new Date().getTime(),
        updater: 'admin'
      }, { transaction: trans })

      // commit
      await trans.commit()
      // return data
      res.status(result.code).send({
        code: result.code,
        data: result.result
      })
    } catch (err) {
      // rollback
      await trans.rollback()
      // throw exception to src\middlewares\CatchWrapMiddleware.js
      // CatchWrapMiddleware will write log
      throw new Error(err)
    }
  }
}
