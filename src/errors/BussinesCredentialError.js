module.exports = class BussinesCredentialError extends Error {
    constructor(message, statusCode = 409) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
      this.name = 'BussinesCredentialError';
    }
  }