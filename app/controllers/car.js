const carService = require("./../services/car");

const home = (req, res) => {
  res.status(200).json({ message: "Ping successfully" });
};

const getList = async (req, res) => {
  try {
    const { category } = req.query;
    const data = await carService.listCar(category);
    res.json({
      status: "OK",
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.Cars;
    const data = await carService.detailCar(id);
    res.json({
      status: "OK",
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const body = req.body;
    const { id: userId } = req.user;
    const image = req.image;
    body.image = image;
    const data = await carService.createCar(body, userId);
    res.json({
      status: "OK",
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.Cars;
    const body = req.body;
    const image = req.image;
    const { id: userId } = req.user;
    body.image = image;
    const data = await carService.updateCar(id, body, userId);
    res.json({
      status: "OK",
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.Cars;
    const { id: userId } = req.user;
    await carService.deleteCar(id, userId);
    res.json({
      status: "OK",
      message: "Delete Successfully",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

function notFound(req, res) {
  res.status(404).json({ message: "Page Not Found" });
}

const setValidationById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Cars = await carService.validation(id);
    req.Cars = Cars;
    next();
  } catch (error) {
    res.status(error.statusCode).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

module.exports = {
  home,
  getList,
  getDetail,
  create,
  update,
  destroy,
  notFound,
  setValidationById,
};
