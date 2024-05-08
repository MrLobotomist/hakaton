const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_messages', {
    message_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'posts',
        key: 'post_id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'post_messages',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "post_messages_pkey",
        unique: true,
        fields: [
          { name: "message_id" },
        ]
      },
    ]
  });
};
