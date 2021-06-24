'use strict'
const { Sequelize, Model, QueryTypes } = require('sequelize')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  class StaffModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  StaffModel.statistics = function (params) {
    // Remove key if value is empty
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null || params[key].length === 0) {
        delete params[key]
      }
    })

    let yid = ''
    if (params.yid) {
      yid += ' AND staff.yid = :yid'
    }

    let full_name = ''
    if (params.full_name) {
      full_name += ' AND staff.full_name LIKE :full_name'
      params.full_name = `%${params.full_name}%`
    }

    let from = ''
    if (params.from) {
      // format date: 9999-09-29
      from += ' AND staff.join_date >= STR_TO_DATE(:from,\'%Y-%m-%d\')'
    }

    let to = ''
    if (params.to) {
      // format date: 9999-09-29
      to += ' AND staff.join_date <= STR_TO_DATE(:to,\'%Y-%m-%d\')'
    }

    let dept_id = ''
    if (params.dept_id) {
      dept_id += ' AND (dept.id = :dept_id OR teamDept.id = :dept_id)'
    }

    let team_ids = ''
    if (params.team_ids) {
      team_ids += ' AND team.id IN (:team_ids)'
    }

    let status = ''
    if (params.status) {
      status += ' AND staff.status = :status'
    }

    let tag_id_json = ''
    if (params.tag_id_json) {
      // Maybe, FULLTEXT Search (index of Database) is better.
      tag_id_json += ' AND ( 1 <> 1 '
      params.tag_id_json.split(',').forEach((tag, index) => {
        tag_id_json += ` OR JSON_CONTAINS(staff.tag_id_json, :tag_id_json_${index}) `
        params[`tag_id_json_${index}`] = tag
      })
      tag_id_json += ' )'
    }

    let countClause = 'SELECT COUNT(DISTINCT staff.id) AS total'

    let selectClause = `
      SELECT staff.id, staff.yid, staff.full_name, job.job_name, staff.join_date, staff.quit_date, staff.status, 
        CONCAT(
          '[',
          GROUP_CONCAT(
            IF(dept.id IS NULL, '{}',  
              JSON_OBJECT(
                'id', dept.id,
                'department_name', dept.dept_name,
                'role_name', staffAssign.role_name,
                'assign_from', staffAssign.assign_from,
                'assign_to', staffAssign.assign_to
              )
            )
          ),
          ']'
        ) AS departments,
        CONCAT(
          '[',
          GROUP_CONCAT(     
            IF(team.id IS NULL, '{}',     
              JSON_OBJECT(
                'id', team.id,
                'team_name', team.name,
                'assign_role', staffAssign.role_name,
                'assign_from', staffAssign.assign_from,
                'assign_to', staffAssign.assign_to
              )
            )
          ),
          ']'
        ) AS teams
    `

    let fromClause = `
      FROM t_staff staff
      INNER JOIN t_job_category job          ON staff.job_category_id = job.id
      LEFT  JOIN t_staff_assign staffAssign   ON staff.id              = staffAssign.staff_id
      LEFT  JOIN t_department dept            ON dept.id               = staffAssign.department_id
      LEFT  JOIN t_team team                  ON team.id               = staffAssign.team_id     
      WHERE 1=1 ${yid} ${full_name} ${from} ${to} ${dept_id} ${team_ids} ${status} ${tag_id_json} 
      GROUP BY staff.id, staff.yid, staff.full_name, job.job_name, staff.join_date, staff.quit_date, staff.status
    `

    let orderClause = `
      ORDER BY staff.status DESC, staff.join_date ASC
      LIMIT :limit OFFSET :offset
    `

    let totalPromise = sequelize.query(countClause + fromClause, {
      replacements: params,
      nest: false,
      type: QueryTypes.SELECT
    })

    let contentPromise = sequelize.query(selectClause + fromClause + orderClause, {
      replacements: params,
      nest: true,
      type: QueryTypes.SELECT
    })

    return {
      totalPromise,
      contentPromise
    }
  }

  StaffModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      yid: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { args: true, msg: 'yid is required' },
          async isUnique (value) {
            const staff = await StaffModel.findOne({where: {yid: value}})
            if (staff) {
              throw new Error('yid already exist')
            }
          }
        }
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'full_name is required' }
        }
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'birthday is required' },
          isDate (value) {
            const format = 'YYYY-MM-DD'
            if (!moment(value, format, true).isValid()) {
              throw new Error('format birthday must be yyyy-mm-dd')
            }
          }
        }
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'gender is required' }
        }
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'status is required' }
        }
      },
      join_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'join_date is required' },
          isDate (value) {
            const format = 'yyyy-mm-dd'
            if (!moment(value, format, true).isValid()) {
              throw new Error('format join_date must be yyyy-mm-dd')
            }
          }
        }
      },
      quit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isDate (value) {
            const format = 'yyyy-mm-dd'
            if (value && !moment(value, format, true).isValid()) {
              throw new Error('format quit_date must be yyyy-mm-dd')
            }
          }
        }
      },
      tag_id_json: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
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
      modelName: 'StaffModel',
      tableName: 't_staff',
      timestamps: false
    }
  )
  return StaffModel
}
