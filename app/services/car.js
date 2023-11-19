const carRepository = require("./../repositories/car");
const ApplicationError = require("./../../config/error/ApplicationError");

exports.listCar = async (category) => {
  try {
    if (category) {
      const cars = await carRepository.getListCarsByCategory(category);
      return cars;
    }
    const cars = await carRepository.getListCars();
    return cars;
  } catch (error) {
    throw new ApplicationError(
      `Failed to get list of cars ${error.message}`,
      500
    );
  }
};

exports.detailCar = async (id) => {
  try {
    const cars = await carRepository.getDetailCars(id);
    return cars;
  } catch (error) {
    throw new ApplicationError(
      `Failed to get list of cars ${error.message}`,
      500
    );
  }
};

exports.createCar = async (body, userId) => {
  try {
    const cars = await carRepository.toCreate(body, userId);
    return cars;
  } catch (error) {
    throw new ApplicationError(
      `Failed to create new car ${error.message}`,
      500
    );
  }
};

exports.updateCar = async (id, body, userId) => {
  try {
    const [_, data] = await carRepository.toUpdate(id, body, userId);
    return data;
  } catch (error) {
    throw new ApplicationError(`Failed to update car: ${error.message}`, 500);
  }
};

exports.deleteCar = async (id, userId) => {
  try {
    await carRepository.toDestroy(id);
    await carRepository.toUpdate(id, { deletedBy: userId }, userId);
    return;
  } catch (error) {
    throw new ApplicationError(`Failed to delete car: ${error.message}`, 500);
  }
};

exports.validation = async (id) => {
  try {
    const cars = await carRepository.isValid(id);
    if (!cars) {
      throw new ApplicationError("Cars not found", 404);
    }
    return cars;
  } catch (error) {
    throw new ApplicationError(
      `Failed to get car by id: ${error.message}`,
      error.statusCode || 500
    );
  }
};
