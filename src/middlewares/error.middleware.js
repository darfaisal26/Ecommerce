const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  // ZOD Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Custom AppError
  if (err.isOperational) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }

  // Fallback - Internal Server Error
  return res.status(500).json({
    success: false,
    message: "Something went wrong on the server!",
  });
};

module.exports = errorHandler;
