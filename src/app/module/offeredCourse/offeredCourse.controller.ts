import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import { OfferedCourseService } from "./offeredCourse.service";
import { Request, Response } from "express";

const createOfferedCourse = catchAsync(async (req: Request, res:Response) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is created successfully',
        data: result
    })
})

export const OfferedCourseController = {
    createOfferedCourse
}