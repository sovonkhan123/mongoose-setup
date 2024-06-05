import { Request, Response } from "express";
import { StudentServices } from "./studentService";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {

    const student = req.body.student;
// data validation using zod

const zodParseData = studentValidationSchema.parse(student)


    // this will call service func to send this data

    const result = await StudentServices.creatStudentIntoDB(zodParseData);

    // send response

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
        success: true,
        message: 'student is retrieved successfully',
        data: result
    })
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try{
        const {studentId} = req.params;
        const result = await StudentServices.getStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: 'student is retrieved successfully',
            data: result
        })
    }catch(err){
        console.log(err)
    }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent
};
