const authService = require("./auth");
const userRepository = require("./../repositories/user");
const ApplicationError = require("./../../config/error/ApplicationError");

exports.toRegister = async (body, isAdmin) => {
    try {
        const { email, password, name, address, phoneNumber } = body;

        if (!email || !password) {
            throw new ApplicationError("Please input email and password", 500);
        }

        const encryptedPassword = await authService.encryptPassword(password);
        const user = await userRepository.createData({
            email,
            encryptedPassword,
            name,
            address,
            phoneNumber,
            role: isAdmin ? "ADMIN" : "MEMBER"
        });

        return user;
    } catch (error) {
        throw new ApplicationError(`Failed to create new user: ${error.message}`, 500);
    }
};

exports.toLogin = async (body) => {
    try {
        const { email, password } = body;

        if (!email || !password) {
            throw new ApplicationError("Please input email and password", 500);
        }

        const user = await userRepository.checkAuth(email);

        if (!user) {
            throw new ApplicationError("The email you entered was not found", 404);
        }

        const checkedPassword = await authService.checkPassword(password, user.encryptedPassword);

        if (!checkedPassword) {
            throw new ApplicationError("You entered the wrong password", 500);
        }

        const token = authService.createToken({id: user.id});
        const userWithToken = {...user.dataValues, token};

        return userWithToken;
    } catch (error) {
        throw new ApplicationError(`Login failed: ${error.message}`, 500);
    }
}
