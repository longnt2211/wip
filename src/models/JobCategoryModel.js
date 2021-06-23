'use strict'
const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class JobCategoryModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  JobCategoryModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      job_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(50)
      },
      skill_id_list: {
        type: DataTypes.TEXT
      },
      grade_id_sort: {
        type: DataTypes.TEXT
      },
      create_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      creater: {
        type: DataTypes.STRING(50)
      },
      update_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updater: {
        type: DataTypes.STRING(50)
      }
    },
    {
      sequelize,
      modelName: 'JobCategoryModel',
      tableName: 't_job_category',
      timestamps: false
    }
  )
  return JobCategoryModel
}
