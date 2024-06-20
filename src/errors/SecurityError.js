module.exports = class SecurityError extends Error {
    constructor(message, statusCode = 401) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
      this.name = 'SecurityError';
    }
  }