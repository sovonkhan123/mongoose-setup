import express from 'express';
import validateRequest from '../../middleWares/ValidateRoutes';
import { OfferedCourseValidationSchema } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post('/create-offeredCourse',
    validateRequest(OfferedCourseValidationSchema.createOfferedCourseValidationSchema), 
    OfferedCourseController.createOfferedCourse,
    
)