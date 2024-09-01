import {RequestHandler} from "express";
import { StudentServices } from "./studentService";
import { catchAsync } from "../../utils/CatchAsync";
import httpStatus from "http-status";
// import httpStatus from "http-status";

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: "student is retrieved successfully",
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "student is retrieved successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const {studentId} = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId)
  res.status(200).json(
    {
      statusCode: httpStatus.OK, 
      success: true,
      message: 'Student is deleted successfully',
      data: result
    }
  )
})
const updateStudent = catchAsync(async (req, res) => {
  const {studentId} = req.params;

  const result = await StudentServices.updateStudentFromDB(studentId, req.body)
  res.status(200).json(
    {
      statusCode: httpStatus.OK, 
      success: true,
      message: 'Student is updated successfully',
      data: result
    }
  )
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
