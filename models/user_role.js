const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role', {
    user_role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_role_pkey",
        unique: true,
        fields: [
          { name: "user_role_id" },
        ]
      },
    ]
  });
};
