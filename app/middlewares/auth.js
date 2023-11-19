const authService = require("./../services/auth");

exports.authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    const user = await authService.authorize(bearerToken);
    req.user = user;
    next();
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

exports.isSuperAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== "SUPERADMIN") {
    res.status(403).json({
      status: "FAIL",
      message: "FORBIDDEN",
    });
    return;
  }
  next();
};

exports.isSuperAdminOrAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== "SUPERADMIN" && role !== "ADMIN") {
    res.status(403).json({
      status: "FAIL",
      message: "FORBIDDEN",
    });
    return;
  }
  next();
};
