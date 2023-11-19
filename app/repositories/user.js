const { User } = require("./../models");

exports.createData = (body) => {
  return User.create(body);
};

exports.checkAuth = (email) => {
  return User.findOne({ where: { email } });
};

exports.findID = (id) => {
  return User.findByPk(id);
};
