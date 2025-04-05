class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack; //"Error\n    at file:///path/to/project/server.js:12:17\n    at Layer.handle [as handle_request]..."
    } else {
      Error.captureStackTrace(this, this.contructor);
    }
  }
}

export { ApiError };
