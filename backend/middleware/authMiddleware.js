// Import the necessary packages
const jwt = require("jsonwebtoken");

// Define the authentication middleware
exports.authMiddleware = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user payload to the request object
    req.user = decodedToken;
    if (req.user.role !== "user") {
      res.status(401).json({
        message: "Authentication failed",
      });
    }

    next();
  } catch (error) {
    console.error("Error during authentication", error);
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

exports.adminAuthMiddleware = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user payload to the request object
    req.user = decodedToken;

    if (req.user.role !== "admin") {
      res.status(401).json({
        message: "Authentication failed",
      });
    }
    next();
  } catch (error) {
    console.error("Error during authentication", error.message);
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};
