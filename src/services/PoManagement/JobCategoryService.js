'use strict'

module.exports = class JobCategoryService {
  constructor (jobCategoryModel) {
    this.jobCategoryModel = jobCategoryModel
  }

  // create new job category
  async save (data) {
    return this.jobCategoryModel.create(data)
  }

  // update job category
  async update (data) {
    const record = await this.jobCategoryModel.findOne({ where: {
      id: parseInt(data.id)
    }})
    let result = 'Can\'t find job category to update'
    let code = '200'
    if (!record) {
      code = '404'
    } else {
      Object.assign(record, {...data})
      result = await record.save()
    }

    return {
      code,
      result
    }
  }
}
