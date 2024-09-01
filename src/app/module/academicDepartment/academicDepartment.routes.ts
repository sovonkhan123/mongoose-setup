
import express  from 'express';
import validateRequest from '../../middleWares/ValidateRoutes';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidation.academicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment)

router.get('/', AcademicDepartmentController.getAllAcademicDepartment)

router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment)

router.patch('/:departmentId', validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentController.updateAcademicDepartment)

export const AcademicDepartmentRoutes = router;