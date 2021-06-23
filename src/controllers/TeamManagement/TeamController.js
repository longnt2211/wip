'use strict'
const TeamService = require('../../services/TeamManagement/TeamService')
const { TeamModel } = require('../../models')

module.exports = class TeamController {
  static async searchTeam (req, res) {
    // Validation parameters
    if (!validateParameters(req.query)) {
      res.status(400)
      return res.send({
        code: 400,
        message: 'Validation error',
        detail: 'Parameters start or result invalid'
      })
    }

    const service = new TeamService(TeamModel)
    const results = await service.searchTeam(req.query)
    res.send(results)
  }
}

function validateParameters (query) {
  if (query.start && parseInt(query.start) < 0) {
    return false
  }

  if (query.result && parseInt(query.result) < 0) {
    return false
  }

  return true
}
