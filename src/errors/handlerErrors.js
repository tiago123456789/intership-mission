module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "InvalidCredentialsError":
      return res.status(err.statusCode).json({ message: err.message });
    case "BussinesError":
      return res.status(err.statusCode).json({ message: err.message });
    case "SecurityError":
      return res.status(err.statusCode).json({ message: err.message });
    case "ValidationError":
      return res.status(400).json({ message: err.errors });
    case "NotFoundError":
      return res.status(err.statusCode).json({ message: err.message });
    default:
      console.log(err);
      return res.status(500).json({ message: "Error Internal" });
  }
};
