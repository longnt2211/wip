'use strict'

const JobCategoryService = require('../../services/PoManagement/JobCategoryService')
const { JobCategoryModel, sequelize } = require('../../models')

const jobCategoryMessage = {
  REQUIRED_JOB_NAME: {code: 'ERROR_JOB_001', message: 'job_name is required'},
  INVALID_JOB_NAME: {code: 'ERROR_JOB_002', message: 'job_name is invalid'},
  INVALID_DESCRIPTION: {code: 'ERROR_JOB_003', message: 'description is invalid'}
}
module.exports = class JobCategoryController {
  // save
  static async save (req, res, next) {
    // validation
    const {
      job_name,
      description,
      skill_id_list,
      grade_id_sort
    } = req.body
    if (!job_name) {
      res.send(jobCategoryMessage.REQUIRED_JOB_NAME)
      return
    }
    if (job_name.length > 100) {
      res.status(404).json(jobCategoryMessage.INVALID_JOB_NAME)
      return
    }
    if (description.length > 50) {
      res.status(404).json(jobCategoryMessage.INVALID_DESCRIPTION)
      return
    }
    // process
    const trans = await sequelize.transaction()
    try {
      const service = new JobCategoryService(JobCategoryModel)
      const result = await service.save({
        job_name,
        description,
        skill_id_list: skill_id_list,
        grade_id_sort,
        create_time: new Date().getTime(),
        creater: 'admin',
        update_time: new Date().getTime(),
        updater: 'admin'
      }, { transaction: trans })

      // commit
      await trans.commit()
      // return data
      res.status(201).json(result)
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
      res.status(404).send(jobCategoryMessage.REQUIRED_JOB_NAME)
      return
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
