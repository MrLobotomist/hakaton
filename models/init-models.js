var DataTypes = require("sequelize").DataTypes;
var _AccessTokens = require("./AccessTokens");
var _Users = require("./Users");
var _chats = require("./chats");
var _messages = require("./messages");

function initModels(sequelize) {
  var AccessTokens = _AccessTokens(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var chats = _chats(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);

  messages.belongsTo(Users, { as: "sender", foreignKey: "sender_id"});
  Users.hasMany(messages, { as: "messages", foreignKey: "sender_id"});
  messages.belongsTo(chats, { as: "chat", foreignKey: "chat_id"});
  chats.hasMany(messages, { as: "messages", foreignKey: "chat_id"});

  return {
    AccessTokens,
    Users,
    chats,
    messages,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
