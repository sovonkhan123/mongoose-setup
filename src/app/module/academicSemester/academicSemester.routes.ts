import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleWares/ValidateRoutes";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidation.academicSemesterValidationSchema),
  AcademicSemesterController.academicSemesterController
);

router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);
router.get("/", AcademicSemesterController.getAllAcademicSemesters);

export const academicSemesterRoutes = router;
