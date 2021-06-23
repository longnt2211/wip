'use strict'
const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class DepartmentModel extends Model {
    /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
    static associate (models) {
      // define association here
      this.belongsToMany(models.TeamModel, {
        foreignKey: 'department_id',
        through: models.TeamAssignModel,
        timestamps: false,
        as: 'team'
      })
    }
  }

  DepartmentModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      dept_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'dept_name is required' }
        }
      },
      establish_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'establish_date is required' }
        }
      },
      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'manager_id is required' }
        }
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
      modelName: 'DepartmentModel',
      tableName: 't_department',
      timestamps: false
    }
  )

  return DepartmentModel
}
