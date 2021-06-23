'use strict'
const { Sequelize, Model, Op } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TeamModel extends Model {
    /**
      * Helper method for defining associations.
      * This method is not a part of Sequelize lifecycle.
      * The `models/index` file will call this method automatically.
      */
    static associate (models) {
      // define association here
      this.belongsToMany(models.DepartmentModel, {
        foreignKey: 'team_id',
        through: models.TeamAssignModel,
        timestamps: false,
        as: 'department'
      })
    }
  }

  TeamModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'name is required' }
        }
      },
      description: {
        type: DataTypes.STRING(100)
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'status is required' }
        }
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true,
        validate: {
          notNull: { args: true, msg: 'type is required' }
        }
      },
      establish_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'establish_date is required' }
        }
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
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
      modelName: 'TeamModel',
      tableName: 't_team',
      timestamps: false
    }
  )

  TeamModel.searchTeam = async function (conditions) {
    const { count, rows } = await TeamModel.findAndCountAll({
      // Columns get from table t_team
      attributes: ['id', 'name', 'description', 'type', 'establish_date', 'status'],
      where: {
        [Op.and]: conditions.teamWhereCond
      },
      offset: conditions.offset,
      limit: conditions.limit,
      order: conditions.order,
      include: [
        {
          model: sequelize.models.DepartmentModel,
          as: 'department',
          through: {
            as: 'team_assign',
            attributes: ['start_date', 'end_date'],
            where: {
              [Op.and]: conditions.teamAssignWhereCond
            }
          },
          // Columns get from table t_department
          attributes: ['id', 'dept_name', 'manager_id'],
          where: {
            [Op.and]: conditions.departmentWhereCond
          }
        }
      ]
    })

    return { 'total_count': count, 'rows': rows }
  }

  return TeamModel
}
