const userController = require("./user");
const userService = require("./../services/user");

const users = [
  {
    email: "user@mail.com",
    password: "user123",
    name: "user",
  },
];

jest.mock("./../services/user", () => ({
  toRegister: jest.fn(),
  toLogin: jest.fn(),
}));

describe("userController", () => {
  describe("#register", () => {
    it("should return new user", async () => {
      const mockRequest = {
        body: {
          email: "user@mail.com",
          password: "user123",
          name: "user",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      userService.toRegister.mockReturnValue(users);

      await userController.register(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Succesful",
        data: users,
      });
    }),
      it("should handle error", async () => {
        const err = new Error("Something");
        const mockRequest = {
          body: {
            email: "user@mail.com",
            password: "user123",
            name: "user",
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        userService.toRegister.mockReturnValue(Promise.reject(err));

        await userController.register(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("userController", () => {
  describe("#registerAdmin", () => {
    it("should return new admin user", async () => {
      const mockRequest = {
        body: {
          email: "user@mail.com",
          password: "user123",
          name: "user",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      userService.toRegister.mockReturnValue(users, true);

      await userController.registerAdmin(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Succesful",
        data: users,
      });
    }),
      it("should handle error", async () => {
        const err = new Error("Something");
        const mockRequest = {
          body: {
            email: "user@mail.com",
            password: "user123",
            name: "user",
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        userService.toRegister.mockReturnValue(Promise.reject(err));

        await userController.registerAdmin(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("userController", () => {
  describe("#login", () => {
    it("should return authenticated user", async () => {
      const mockRequest = {
        body: {
          email: "user@mail.com",
          password: "user123",
          name: "user",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      userService.toLogin.mockReturnValue(users);

      await userController.login(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Login succesful",
        data: users,
      });
    }),
      it("should handle error", async () => {
        const err = new Error("Something");
        const mockRequest = {
          body: {
            email: "user@mail.com",
            password: "user123",
            name: "user",
          },
        };

        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };

        userService.toLogin.mockReturnValue(Promise.reject(err));

        await userController.login(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "FAIL",
          message: err.message,
        });
      });
  });
});

describe("userController", () => {
  describe("#currentUser", () => {
    it("should return current user", () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      userController.currentUser(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Succesful",
        data: mockRequest.user,
      });
    });
  });
});
