const carService = require("./../car");
const carRepository = require("./../../repositories/car");
const ApplicationError = require("./../../../config/error/ApplicationError");

const cars = [
  {
    title: "Car",
    content: "Car Content",
    category: "Car Category",
  },
];

jest.mock("./../../repositories/car", () => ({
  getListCars: jest.fn(),
  getListCarsByCategory: jest.fn(),
  getDetailCars: jest.fn(),
  toCreate: jest.fn(),
  toUpdate: jest.fn(),
  toDestroy: jest.fn(),
  isValid: jest.fn(),
}));

describe("CarService", () => {
  describe("#listCar", () => {
    it("should return list of cars by category", async () => {
      const category = "car";

      carRepository.getListCarsByCategory.mockReturnValue(cars);
      const carDataByCategory = await carService.listCar(category);

      expect(carDataByCategory).toEqual(cars);
      expect(carRepository.getListCarsByCategory).toHaveBeenCalledWith(
        category
      );
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const category = "car";

      carRepository.getListCarsByCategory.mockRejectedValue(err);

      expect(carService.listCar(category)).rejects.toThrow(ApplicationError);
    });

    it("should return list of cars", async () => {
      carRepository.getListCars.mockReturnValue(cars);
      const carData = await carService.listCar();

      expect(carData).toEqual(cars);
      expect(carRepository.getListCars).toHaveBeenCalledWith();
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");

      carRepository.getListCars.mockRejectedValue(err);

      expect(carService.listCar()).rejects.toThrow(ApplicationError);
    });
  });

  describe("#detailCar", () => {
    it("should return the detail of a car", async () => {
      const id = 1;

      carRepository.getDetailCars.mockReturnValue(cars);
      const result = await carService.detailCar(id);

      expect(result).toEqual(cars);
      expect(carRepository.getDetailCars).toHaveBeenCalledWith(id);
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const id = 1;

      carRepository.getDetailCars.mockRejectedValue(err);

      expect(carService.detailCar(id)).rejects.toThrow(ApplicationError);
    });
  });

  describe("#createCar", () => {
    it("should return data from new cars", async () => {
      const mockId = 1;
      const mockData = {
        title: "Car",
        content: "Car Content",
        category: "Car Category",
      };

      carRepository.toCreate.mockReturnValue(cars);
      const result = await carService.createCar(mockData, mockId);

      expect(result).toEqual(cars);
      expect(carRepository.toCreate).toHaveBeenCalledWith(mockData, mockId);
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const mockId = 1;
      const mockData = {
        title: "Car",
        content: "Car Content",
        category: "Car Category",
      };

      carRepository.toCreate.mockRejectedValue(err);

      expect(carService.createCar(mockData, mockId)).rejects.toThrow(
        ApplicationError
      );
    });
  });

  describe("#updateCar", () => {
    it("should return data from new cars", async () => {
      const mockUserId = 111;
      const mockId = 1;
      const mockData = {
        title: "Car",
        content: "Car Content",
        category: "Car Category",
      };

      carRepository.toUpdate.mockReturnValue([true, cars]);
      const result = await carService.updateCar(mockId, mockData, mockUserId);

      expect(result).toEqual(cars);
      expect(carRepository.toUpdate).toHaveBeenCalledWith(
        mockId,
        mockData,
        mockUserId
      );
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const mockUserId = 111;
      const mockId = 1;
      const mockData = {
        title: "Car",
        content: "Car Content",
        category: "Car Category",
      };

      carRepository.toUpdate.mockReturnValue(err);

      expect(
        carService.updateCar(mockId, mockData, mockUserId)
      ).rejects.toThrow(ApplicationError);
    });
  });

  describe("#deleteCar", () => {
    it("should return data from new cars", async () => {
      const mockUserId = 111;
      const mockId = 1;
      const mockData = {
        deletedBy: mockUserId,
      };

      carRepository.toDestroy.mockReturnValue();
      carRepository.toUpdate.mockReturnValue();

      await carService.deleteCar(mockId, mockUserId);

      expect(carRepository.toDestroy).toHaveBeenCalledWith(mockId);
      expect(carRepository.toUpdate).toHaveBeenCalledWith(
        mockId,
        mockData,
        mockUserId
      );
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const mockId = 1;
      const mockUserId = 111;

      carRepository.toDestroy.mockRejectedValue(err);

      expect(carService.deleteCar(mockId, mockUserId)).rejects.toThrow(
        ApplicationError
      );
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const mockId = 1;
      const mockUserId = 111;

      carRepository.toDestroy.mockReturnValue();
      carRepository.toUpdate.mockRejectedValue(err);

      expect(carService.deleteCar(mockId, mockUserId)).rejects.toThrow(
        ApplicationError
      );
    });
  });

  describe("#validation", () => {
    it("should return data from new cars", async () => {
      const mockId = 1;

      carRepository.isValid.mockReturnValue(cars);

      const result = await carService.validation(mockId);

      expect(result).toEqual(cars);
      expect(carRepository.isValid).toHaveBeenCalledWith(mockId);
    });

    it("should handle errors and send a response", async () => {
      const err = new Error("Error");
      const mockId = 1;

      carRepository.isValid.mockRejectedValue(err);

      expect(carService.validation(mockId)).rejects.toThrow(ApplicationError);
    });
  });
});
