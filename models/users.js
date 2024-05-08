const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "Users_username_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "Users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
