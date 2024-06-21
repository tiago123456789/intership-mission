const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
  let token = req.headers.authorization;

  
  if (!token) {
    return res.status(401).json({ message: "Token não informado." });
  }
  
  try {
    token = token.split(" ")[1];

    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.userId;
    req.role = payload.role;
    req.companyId = payload.companyId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirou." });
  }
};
