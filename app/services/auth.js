const bcrypt = require("bcrypt");
const SALT = 10;
const jwt = require("jsonwebtoken");
const userRepository = require("./../repositories/user");
const ApplicationError = require("../../config/error/ApplicationError");

const encryptPassword = async (password) => {
    try {
        const encrypt = await bcrypt.hash(password, SALT);
        return encrypt;
    } catch (error) {
        throw new Error(error);
    }
};

const checkPassword = async (password, hash) => {
    try {
        const checked = await bcrypt.compare(password, hash);
        return checked;
    } catch (error) {
        throw new Error(error);
    }
};

const JWT_SECRET_KEY = "CAR_RENTAL";

const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY);
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};

const authorize = async (bearerToken) => {
    try {
        if (!bearerToken) {
            throw new ApplicationError("Unauthorize", 401);
        }

        const token = bearerToken.split("Bearer ")[1];

        const decoded = verifyToken(token);

        const { id } = decoded;

        const user = await userRepository.findID(id);

        if (!user) {
            throw new ApplicationError('Unauthorize', 401)
        }

        return user;
    } catch (error) {
        throw new ApplicationError(error.message, error.statusCode || 500);
    }
}

module.exports = {
    encryptPassword,
    checkPassword,
    createToken,
    verifyToken,
    authorize
};
