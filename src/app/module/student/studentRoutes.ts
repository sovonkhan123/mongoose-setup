import express from "express";
import { StudentController } from "./studentController";
import validateRequest from "../../middleWares/ValidateRoutes";
import { studentValidations } from "./student.validation";

const router = express.Router();

router.get('/', StudentController.getAllStudents)

router.get('/:studentId', StudentController.getSingleStudent)

router.delete('/:studentId', StudentController.deleteStudent)

router.patch('/:studentId',validateRequest(studentValidations.studentUpdateValidationSchema), StudentController.updateStudent)

export const studentRoutes = router;
