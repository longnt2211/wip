'use strict'

const {ValidationError} = require('sequelize')
const {sequelize} = require('../../models')

module.exports = class StaffService {
  constructor (staffModel, tagModel, sequelize) {
    this.staffModel = staffModel
    this.tagModel = tagModel
    this.sequelize = sequelize
  }

  /**
   * Pagiation
   *
   * @param {Object} pageable.yid
   * @param {Object} pageable.full_name
   * @param {Object} pageable.from
   * @param {Object} pageable.to
   * @param {Object} pageable.dept_id
   * @param {Object} pageable.team_ids
   * @param {Object} pageable.tag_id_json
   * @param {Object} pageable.status
   * @param {Object} pageable.limit
   * @param {Object} pageable.offset
   *
   * @returns
   */
  async statistics (pageable) {
    let limit = 100
    if (pageable.limit && !isNaN(pageable.limit) && pageable.limit > 0) {
      limit = Number(pageable.limit)
    }

    let offset = 0
    if (pageable.offset && !isNaN(pageable.offset) && pageable.offset > 0) {
      offset = Number(pageable.offset)
    }

    let params = {
      yid: pageable.yid,
      full_name: pageable.full_name,
      from: pageable.from,
      to: pageable.to,
      dept_id: pageable.dept_id,
      team_ids: pageable.team_ids,
      tag_id_json: pageable.tag_id_json,
      status: pageable.status,
      limit: limit,
      offset: offset
    }

    let staff = this.staffModel.statistics(params)
    let total = ((await staff.totalPromise)[0] || {total: 0}).total
    let content = await staff.contentPromise || []

    const removeObjectEmpty = (k, v) => {
      if (Array.isArray(v)) {
        return v.filter(e => Object.keys(e).length > 0)
      };

      return v
    }
    content.forEach(el => {
      let verboseStatus = {
        code: el.status,
        name: el.status === 1 ? 'Still working' : 'Quit'
      }
      el.status = verboseStatus
      el.departments = JSON.parse(el.departments, removeObjectEmpty)
      el.teams = JSON.parse(el.teams, removeObjectEmpty)
    })

    return {
      total,
      content,
      limit,
      offset
    }
  }

  /**
   * Create a Staff
   *
   * @param {*} payload in request body
   * @returns a staff
   */
  async create (payload) {
    const tag_id_json = []

    // find tag or create
    const trans = await this.sequelize.transaction()
    try {
      const tag_json = payload.tag_json || []
      for (const tag_mame of tag_json) {
        const tag = await this.tagModel.findOrCreate({
          where: {
            tag_name: tag_mame
          },
          defaults: {
            tag_name: tag_mame,
            creater: payload.creater,
            updater: payload.creater
          },
          transaction: trans
        })
        tag_id_json.push(tag[0].dataValues.id)
      }
      // save staff
      let staff = await this.staffModel.create({
        yid: payload.yid,
        full_name: payload.full_name,
        birthday: new Date(payload.birthday),
        gender: payload.gender,
        status: payload.status,
        join_date: new Date(payload.join_date),
        quit_date: null,
        tag_id_json: tag_id_json,
        creater: payload.creater,
        updater: payload.creater
      })

      // commit
      await trans.commit()
      return staff
    } catch (err) {
      if (err instanceof ValidationError) {
        err.status = 400
        err.message = {
          code: err.status,
          message: 'Validation error',
          detail: err.message.split('\n')
        }
      }
      await trans.rollback()
      throw err
    }
  }

  /**
   * Edit a Staff
   *
   * @param {*} payload in request body
   * @returns a staff
   */
  async edit (payload) {
    let staff = await this.staffModel.findOne({
      where: {
        yid: payload.yid
      }
    })

    if (staff === undefined || staff === null) {
      throw new ValidationError('',
        [{
          type: 'Validation Error',
          path: 'yid',
          message: `${payload.yid} is not exiting`
        }]
      )
    }

    Object.assign(staff, payload)

    await sequelize.transaction(async (t) => {
      await staff.save({transaction: t})

      // Quit from company
      if (payload.status === 0) {
        // TODO: Update related Assign record end date to quit date
        // Not yet StaffAssignModel
      }

      return {
        staff,
        edited: true
      }
    })
  }

  /**
   * Delete a Staff
   *
   * @param {*} payload in request body
   * @returns a staff
   */
  async delete (yid) {
    let staff = await this.staffModel.findOne({
      where: {
        yid: yid
      }
    })

    if (staff === undefined || staff === null) {
      throw new ValidationError('',
        [{
          type: 'Validation Error',
          path: 'yid',
          message: `${yid} is not exiting`
        }]
      )
    }

    await staff.destroy()

    return {
      staff,
      deleted: true
    }
  }
}
