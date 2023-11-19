const { Car, User } = require("./../models");

exports.getListCars = () => {
  return Car.findAll({
    attributes: {
      exclude: ["createdBy", "updatedBy", "deletedBy", "deletedAt"],
    },
  });
};

exports.getListCarsByCategory = (category) => {
  return Car.findAll({ where: { category } });
};

exports.getDetailCars = (id) => {
  return Car.findByPk(id, {
    include: [
      {
        model: User,
        as: "created",
      },
      {
        model: User,
        as: "updated",
      },
      {
        model: User,
        as: "deleted",
      },
    ],
    attributes: {
      exclude: ["createdBy", "updatedBy", "deletedBy", "deletedAt"],
    },
  });
};

exports.toCreate = (body, userId) => {
  return Car.create({ ...body, createdBy: userId });
};

exports.toUpdate = (id, body, userId) => {
  return Car.update(
    { ...body, updatedBy: userId },
    {
      where: { id },
      returning: true,
      paranoid: false,
    }
  );
};

exports.toDestroy = (id) => {
  return Car.destroy({ where: { id } });
};

exports.isValid = (id) => {
  return Car.findByPk(id);
};
