const express = require("express");
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "upload");
  },
  filename: function (req, file, callback) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    callback(null, fileName);
  },
});
const fileFilter = (req, file, callback) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return callback(null, true);
  } else {
    return callback(
      appError.create("this file type is not an image", 400),
      false
    );
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

const router = express.Router();

const usersController = require("../controller/users.controller");
const verifyToken = require("../middlewares/verifyToken");
const appError = require("../utils/appError");

router.route("/").get(verifyToken, usersController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

router.route("/login").post(usersController.login);

module.exports = router;
