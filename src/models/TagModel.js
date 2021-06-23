'use strict'
const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TagModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  TagModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      tag_name: {
        type: DataTypes.STRING(100),
        allowNull: false
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
      modelName: 'TagModel',
      tableName: 't_tag',
      timestamps: false
    }
  )
  return TagModel
}
