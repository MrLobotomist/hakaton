var DataTypes = require("sequelize").DataTypes;
var _AccessTokens = require("./AccessTokens");
var _Users = require("./Users");

function initModels(sequelize) {
  var AccessTokens = _AccessTokens(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);


  return {
    AccessTokens,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
