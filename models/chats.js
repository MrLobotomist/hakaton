const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chats', {
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chats',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chats_pkey",
        unique: true,
        fields: [
          { name: "chat_id" },
        ]
      },
    ]
  });
};
