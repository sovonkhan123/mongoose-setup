import { Request, Response } from "express";
import { StudentServices } from "./studentService";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    // this will call service func to send this data

    const result = await StudentServices.creatStudentIntoDB(student);

    // send response

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
};
