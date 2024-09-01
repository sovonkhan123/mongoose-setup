import { Student } from "./../student/studentInterface";
import config from "../../config";
import { TUser } from "./UserInterface";
import { User } from "./UserModel";
import { studentModel } from "../student/studentModel";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./User.utils";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: Student) => {
  // if (await studentModel.isUserExists(studentData.id)){
  //     throw new Error('User already exists')
  // }
  const userData: Partial<TUser> = {};

  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.AcademicSemester
  );

  // Ensure that admissionSemester is not null
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Semester is not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction-1)
    const result = await User.create([userData], { session });

    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    payload.id = result[0].id;
    payload.user = result[0]._id;

    // create a student (transaction-2)
    const newStudent = await studentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }

  const academicDepartment = await AcademicDepartment.findById(
    payload.AcademicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic Department is not found"
    );
  }

  //   create an instance

  //   const student = new studentModel(studentData);

  //   if(await student.isUserExits(studentData.id)) {
  //     throw new Error('user already exists!')
  //   }

  // built in instance method
  //   const result = await student.save();
};

export const UserServices = {
  creatStudentIntoDB: createStudentIntoDB,
};
