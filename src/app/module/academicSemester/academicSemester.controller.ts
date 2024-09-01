
import httpStatus from "http-status";
import { catchAsync } from "../../utils/CatchAsync";
import { AcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.academicSemesterIntoDB(req.body)
    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created successfully',
        data: result
    }) 
})

const getAllAcademicSemesters =catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemestersFromDB()

    res.status(200).json({
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic semesters are retrieved successfully',
        data: result
    })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await AcademicSemesterService.getAnAcademicSemesterFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "student is retrieved successfully",
      data: result,
    });
  });

  const updateAcademicSemester = catchAsync(async (req, res) => {
    const {semesterId} = req.params;
    const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(semesterId, req.body)

    res.status(200).json({
        success: true,
        message: "student is retrieved successfully",
        data: result,
      });
  })

export const AcademicSemesterController = {
    academicSemesterController: createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester
}