'use strict'
const { Op } = require('sequelize')

module.exports = class TeamService {
  constructor (teamModel) {
    this.teamModel = teamModel
  }

  async searchTeam (params) {
    // Prepare condition
    let start = params.start ? parseInt(params.start) : 1
    let limit = params.limit ? parseInt(params.limit) : 10
    let offset = start - 1

    let conditions = {
      'limit': limit,
      'offset': offset,
      'order': [
        ['establish_date', 'DESC'],
        ['type', 'DESC'],
        ['status', 'DESC'],
        ['name', 'ASC']
      ],
      'teamWhereCond': this.teamWhereBuilder(params),
      'departmentWhereCond': this.departmentWhereBuilder(params),
      'teamAssignWhereCond': this.teamAssignWhereBuilder(params)
    }

    let res = await this.teamModel.searchTeam(conditions)

    return {
      'start': start,
      'offset': offset,
      'limit': limit,
      'total_count': res.total_count,
      'team': res.rows
    }
  }

  // where builder for searchTeam
  teamWhereBuilder (params) {
    let filterOptions = []

    // default conditions
    // Only get team assigning

    // like team_name
    if (params.hasOwnProperty('team_name')) {
      filterOptions.push({
        name: {
          [Op.substring]: params.team_name
        }
      })
    }
    // team_type
    if (params.hasOwnProperty('team_type')) {
      filterOptions.push({
        type: {
          [Op.eq]: parseInt(params.team_type)
        }
      })
    }
    // establish_date_from, establish_date_to
    if (params.hasOwnProperty('establish_date_from')) {
      filterOptions.push({
        establish_date: {
          [Op.gte]: params.establish_date_from
        }
      })
    }
    console.log(params)

    if (params.hasOwnProperty('establish_date_to')) {
      filterOptions.push({
        establish_date: {
          [Op.lte]: params.establish_date_to
        }
      })
    }

    // status
    if (params.hasOwnProperty('status')) {
      filterOptions.push({
        status: {
          [Op.eq]: parseInt(params.status)
        }
      })
    }

    return filterOptions
  }

  departmentWhereBuilder (params) {
    let filterOptions = []

    // like department_name
    if (params.hasOwnProperty('department_name')) {
      filterOptions.push({
        dept_name: {
          [Op.substring]: params.department_name
        }
      })
    }

    return filterOptions
  }

  teamAssignWhereBuilder (params) {
    let filterOptions = []

    // team is being assigned
    // end_date is null OR end_date >= current date
    filterOptions.push({
      end_date: {
        [Op.or]: {
          [Op.gte]: new Date(),
          [Op.eq]: null
        }
      }
    })

    return filterOptions
  }
}
