module.exports = function authorizeRole(role) {
  return (req, res, next) => {
    if (req.role !== role.toUpperCase()) {
      return res
        .status(403)
        .json({ message: 'Sem permissão para realizar essa ação.' });
    }
    return next();
  };
};
