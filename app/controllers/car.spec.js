const CarController = require("./car");
const carService = require("./../services/car");

const cars = [
  {
    title: "Car",
    content: "Car Content",
    category: "Car Category",
  },
];

jest.mock("./../services/car", () => ({
  listCar: jest.fn(),
  detailCar: jest.fn(),
  createCar: jest.fn(),
  updateCar: jest.fn(),
  deleteCar: jest.fn(),
  validation: jest.fn(),
}));

describe("CarController", () => {
  describe("#home", () => {
    it("should return message: Ping successfully", () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      CarController.home(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Ping successfully",
      });
    });
  });
});

describe("CarController", () => {
  describe("#getList", () => {
    it("should return list of cars", async () => {
      const mockRequest = {
        query: {
          category: "car",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carService.listCar.mockReturnValue(cars);

      await CarController.getList(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: cars,
      });
    }),
      it("should handle errors and send a response", async () => {
        const err = new Error("Something");
        const mockRequest = {
          query: {
            category: "car",
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        carService.listCar.mockReturnValue(Promise.reject(err));

        await CarController.getList(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(err.statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("CarController", () => {
  describe("#getDetail", () => {
    it("should return detail of cars", async () => {
      const mockRequest = {
        Cars: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carService.detailCar.mockReturnValue(cars);

      await CarController.getDetail(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: cars,
      });
    }),
      it("should handle errors and send a response", async () => {
        const err = new Error("Something");
        const mockRequest = {
          Cars: {
            id: 1,
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        carService.detailCar.mockReturnValue(Promise.reject(err));

        await CarController.getDetail(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(err.statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("CarController", () => {
  describe("#create", () => {
    it("should return data from new cars", async () => {
      const mockRequest = {
        user: {
          id: 1,
        },
        body: {
          title: "Car",
          content: "Car Content",
          category: "Car Category",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carService.createCar.mockReturnValue(cars);

      await CarController.create(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: cars,
      });
    }),
      it("should handle errors and send a response", async () => {
        const err = new Error("Something");
        const mockRequest = {
          user: {
            id: 1,
          },
          body: {
            title: "Car",
            content: "Car Content",
            category: "Car Category",
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        carService.createCar.mockReturnValue(Promise.reject(err));

        await CarController.create(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(err.statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("CarController", () => {
  describe("#update", () => {
    it("should return data from new cars updated", async () => {
      const mockRequest = {
        Cars: {
          id: 1,
        },
        user: {
          id: 1,
        },
        body: {
          title: "Car",
          content: "Car Content",
          category: "Car Category",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carService.updateCar.mockReturnValue(cars);

      await CarController.update(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: cars,
      });
    }),
      it("should handle errors and send a response", async () => {
        const err = new Error("Something");
        const mockRequest = {
          Cars: {
            id: 1,
          },
          user: {
            id: 1,
          },
          body: {
            title: "Car",
            content: "Car Content",
            category: "Car Category",
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        carService.updateCar.mockReturnValue(Promise.reject(err));

        await CarController.update(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(err.statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("CarController", () => {
  describe("#destroy", () => {
    it("should return success message of successfully deleting car data ", async () => {
      const mockRequest = {
        Cars: {
          id: 1,
        },
        user: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carService.deleteCar.mockReturnValue(cars);

      await CarController.destroy(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Delete Successfully",
      });
    }),
      it("should handle errors and send a response", async () => {
        const err = new Error("Something");
        const mockRequest = {
          Cars: {
            id: 1,
          },
          user: {
            id: 1,
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        carService.deleteCar.mockReturnValue(Promise.reject(err));

        await CarController.destroy(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(err.statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("CarController", () => {
  describe("#notFound", () => {
    it("should return error message: Page Not Found", () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      CarController.notFound(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Page Not Found",
      });
    });
  });
});

describe("CarController", () => {
  describe("#setValidationById", () => {
    it("should set Cars in request object and call next", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };
      const mockResponse = {};
      const next = jest.fn();

      carService.validation.mockReturnValue(cars);

      await CarController.setValidationById(mockRequest, mockResponse, next);

      expect(carService.validation).toHaveBeenCalledWith(1);
      expect(mockRequest.Cars).toBe(cars);
      expect(next).toHaveBeenCalledWith();
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Something");
      const mockRequest = {
        params: {
          id: 1,
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      carService.validation.mockReturnValue(Promise.reject(err));

      await CarController.setValidationById(mockRequest, mockResponse, next);

      expect(carService.validation).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(err.statusCode);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "FAIL",
        message: err.message,
      });
      expect(next).not.toHaveBeenCalledWith();
    });
  });
});
