const express = require("express");
const feedController = require("../controllers/FeedController");

const hasAuthenticated = require("../middlewares/hasAuthenticated");

const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split(".")[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require("crypto").randomBytes(64).toString("hex");

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

const upload = multer({ storage });

router.post(
  "/feeds",
  upload.single("image"),
  hasAuthenticated,
  feedController.createFeed
);

module.exports = router;
