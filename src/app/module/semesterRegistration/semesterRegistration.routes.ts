import express from "express";
import validateRequest from "../../middleWares/ValidateRoutes";
import { SemesterRegistrationSchemaValidation } from "./semesterRegistration.validation";
import { SemesterRegistrationController } from "./semesterRegistration.controller";

const router = express.Router();

router.post(
  "/create-registration",
  validateRequest(
    SemesterRegistrationSchemaValidation.createSemesterRegistrationSchemaValidation
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get("/", SemesterRegistrationController.getAllSemesterRegistration);

router.get("/:id", SemesterRegistrationController.getSingleSemesterRegistration);

router.patch("/:id", SemesterRegistrationController.updateSemesterRegistration);

export const RegisteredRoutes = router;
