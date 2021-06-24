'use strict'
const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TeamAssignModel extends Model {
    /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
    static associate (models) {
      // define association here
      this.belongsTo(models.TeamModel, {
        foreignKey: {
          name: 'team_id',
          allowNull: false
        },
        targetKey: 'id'
      })
      this.belongsTo(models.DepartmentModel, {
        foreignKey: {
          name: 'department_id',
          allowNull: false
        },
        targetKey: 'id'
      })
    }
  }

  TeamAssignModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'department_id is required' }
        }
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'team_id is required' }
        }
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'start_date is required' }
        }
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
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
      modelName: 'TeamAssignModel',
      tableName: 't_team_assign',
      timestamps: false
    }
  )

  return TeamAssignModel
}
