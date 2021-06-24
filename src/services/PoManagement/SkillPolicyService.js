'use strict'

module.exports = class SkillPolicyService {
  constructor (skillPolicyModel) {
    this.skillPolicyModel = skillPolicyModel
  }

  async getAll () {
    const result = await this.skillPolicyModel.findAll()
    return result
  }

  async getDetails (id) {
    const result = await this.skillPolicyModel.findOne({
      where: {
        id: parseInt(id)
      }
    })
    return result
  }

  // save
  async save (data) {
    return this.skillPolicyModel.create(data)
  }

  // update
  async update (data) {
    const record = await this.skillPolicyModel.findOne({ where: {
      id: parseInt(data.id)
    }})
    Object.assign(record, {...data})
    const result = await record.save()
    return result
  }

  // delete
  async delete (id) {
    const record = await this.skillPolicyModel.findOne({
      where: {
        id: parseInt(id)
      }
    })
    const result = await record.destroy()
    return result
  }
}
