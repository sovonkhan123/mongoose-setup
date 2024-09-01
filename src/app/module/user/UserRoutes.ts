import express from "express";
import { userController } from "./UserController";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middleWares/ValidateRoutes";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.studentValidationSchema),
  userController.createUser
);

export const UserRoutes = router;
