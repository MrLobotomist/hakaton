const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('access_tokens', {
    user_id: {
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
    tableName: 'access_tokens',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "AccessTokens_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
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
