const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    message_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chats',
        key: 'chat_id'
      }
    }
  }, {
    sequelize,
    tableName: 'messages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "messages_pkey",
        unique: true,
        fields: [
          { name: "message_id" },
        ]
      },
    ]
  });
};
