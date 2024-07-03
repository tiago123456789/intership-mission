const jwt = require('jsonwebtoken');

class GenerateJwtTokenProvider {
  getToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
  }
}

module.exports = GenerateJwtTokenProvider;
