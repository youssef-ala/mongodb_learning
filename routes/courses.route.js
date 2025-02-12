const express = require("express");

const router = express.Router();

const coursesController = require("../controller/courses.controller");
const { validationSchema } = require("../middlewares/validationSchema");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(),
    coursesController.createNewCourse
  );

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
