class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static conflict(message) {
    return new ApiError(409, message);
  }

  static internalServerError(message) {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
