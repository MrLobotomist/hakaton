const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccessTokens', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "AccessTokens_token_key"
    }
  }, {
    sequelize,
    tableName: 'AccessTokens',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "AccessTokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "AccessTokens_token_key",
        unique: true,
        fields: [
          { name: "token" },
        ]
      },
    ]
  });
};
