var DataTypes = require("sequelize").DataTypes;
var _access_tokens = require("./access_tokens");
var _post_messages = require("./post_messages");
var _posts = require("./posts");
var _roles = require("./roles");
var _user_role = require("./user_role");
var _users = require("./users");

function initModels(sequelize) {
  var access_tokens = _access_tokens(sequelize, DataTypes);
  var post_messages = _post_messages(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  post_messages.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(post_messages, { as: "post_messages", foreignKey: "post_id"});
  user_role.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_role, { as: "user_roles", foreignKey: "role_id"});
  post_messages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(post_messages, { as: "post_messages", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  user_role.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_role, { as: "user_roles", foreignKey: "user_id"});

  return {
    access_tokens,
    post_messages,
    posts,
    roles,
    user_role,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
