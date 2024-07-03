module.exports = class NotFoundError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = 'NotFoundError';
  }
};
