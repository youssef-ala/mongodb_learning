const express = require("express");
const coursesController = require("../controller/courses.controller");
const { validationSchema } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    verifyToken,
    allowedTo(userRoles.MANAGER),
    validationSchema(),
    coursesController.createNewCourse
  );

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(coursesController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    coursesController.deleteCourse
  );

module.exports = router;
