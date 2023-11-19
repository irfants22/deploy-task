const userService = require("./../services/user");

exports.register = async (req, res) => {
    try {
        const body = req.body;
        const data = await userService.toRegister(body)
        res.json({
            status: "OK",
            message: "Succesful",
            data
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const body = req.body;
        const data = await userService.toRegister(body, true)
        res.json({
            status: "OK",
            message: "Succesful",
            data
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const body = req.body;
        const data = await userService.toLogin(body)
        res.json({
            status: "OK",
            message: "Login succesful",
            data
        });
    } catch (error) {
        res.status(500).json({
            status: "FAIL",
            message: error.message,
        });
    }
};

exports.currentUser = (req, res) => {
    res.json({
        status: "OK",
        message: "Succesful",
        data: req.user,
    });
}