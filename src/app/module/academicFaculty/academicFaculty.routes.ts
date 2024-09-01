
import express  from 'express';
import validateRequest from '../../middleWares/ValidateRoutes';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty)

router.get('/', AcademicFacultyController.getAllAcademicFaculty)

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)

router.patch('/:facultyId', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty)

export const AcademicFacultyRoutes = router;