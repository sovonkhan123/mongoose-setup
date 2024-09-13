import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleWares/ValidateRoutes";
import { zodCourseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(zodCourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);

router.get(
    "/", 
    CourseController.getAllCourses
);

router.get(
    "/:id", 
    CourseController.getSingleCourses
);

router.delete(
    "/:id", 
    CourseController.deleteCourses
);

router.patch(
  "/:id",
  validateRequest(zodCourseValidation.updateCourseValidationSchema),
  CourseController.updateCourses
);

router.put(
    "/:id/assign-faculties", 
    validateRequest(zodCourseValidation.assignFacultiesWithCourseValidationSchema),CourseController.assignFaculties
);
router.delete(
    "/:id/remove-faculties", 
    validateRequest(zodCourseValidation.assignFacultiesWithCourseValidationSchema),CourseController.removeFaculties
);

export const CourseRoutes = router;
