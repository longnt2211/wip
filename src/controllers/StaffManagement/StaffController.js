'use strict'

const { ValidationError } = require('sequelize')
const StaffService = require('../../services/StaffManagement/StaffService')
const { StaffModel, TagModel, sequelize } = require('../../models')
const moment = require('moment')

module.exports = class StaffController {
  static async get (req, res) {
    const queryObject = req.query
    const {from, to} = req.query
    if (!StaffController.isDate(res, {from}) || !StaffController.isDate(res, {to})) {
      return
    }

    const service = new StaffService(StaffModel)
    const data = await service.statistics(queryObject)
    res.send({
      code: 200,
      data
    })
  }

  static async registry (req, res) {
    const service = new StaffService(StaffModel, TagModel, sequelize)
    const data = await service.create(req.body)
    return res.send(data)
  }

  static async edit (req, res) {
    const service = new StaffService(StaffModel)

    const {birthday, join_date} = req.body

    if (!StaffController.isDate(res, {birthday}) || !StaffController.isDate(res, {join_date})) {
      return
    }

    const [ data, error ] = await service.edit(req.body).then(data => [ data ]).catch(error => [ null, error ])
    if (error) {
      return StaffController.handleSequelizeValidationError(res, error)
    }

    return res.send({
      code: 200,
      data
    })
  }

  static async delete (req, res) {
    const service = new StaffService(StaffModel)

    const [ data, error ] = await service.delete(req.query.yid).then(data => [ data ]).catch(error => [ null, error ])
    if (error) {
      return StaffController.handleSequelizeValidationError(res, error)
    }

    return res.send({
      code: 200,
      data
    })
  }

  // Maybe, use middleware will better?
  // TODO: Validate is only temp for FrontEnd use easily
  static handleSequelizeValidationError (res, e) {
    if (e.name === 'SequelizeValidationError') {
      const error = {}
      e.errors.map(err => {
        error[err.path] = err.message
      })

      return res.send({
        code: 400,
        error
      })
    }

    if (e.name === 'SequelizeForeignKeyConstraintError') {
      const error = {}
      e.fields.map(err => {
        error[err] = 'Object is not existing'
      })

      return res.send({
        code: 400,
        error
      })
    }

    throw e
  }

  static isDate (res, date) {
    const key = Object.keys(date)[0]
    const value = date[key]

    if (!value) return true

    const checkDate = moment(value, 'YYYY-MM-DD', true).isValid()

    if (!checkDate) {
      const error = new ValidationError('',
        [{
          type: 'Validation Error',
          path: key,
          message: `${value} is not date (YYYY-MM-DD)`
        }]
      )
      StaffController.handleSequelizeValidationError(res, error)

      return false
    }

    return true
  }
}
