import { RequestHandler } from "express";
import { UserServices } from "./UserService";
import { catchAsync } from "../../utils/CatchAsync";

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.creatStudentIntoDB(password, studentData);

  // send response

  res.status(200).json({
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
