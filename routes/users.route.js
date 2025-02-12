const express = require("express");

const router = express.Router();

const usersController = require("../controller/users.controller");

// get all users

//register

//login

router.route("/").get(usersController.getAllUsers);
router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
