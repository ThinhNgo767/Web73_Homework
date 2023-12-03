const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      const userRole = decoded.role;

      if (userRole === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: "Permission denied" });
      }
    });
  };
};

module.exports = checkUserRole;
