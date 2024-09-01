import mongoose from "mongoose";
import { studentModel } from "./studentModel";
import AppError from "../../Errors/AppError";
import { User } from "../user/UserModel";
import httpStatus from "http-status";
import { Student } from "./studentInterface";

const getAllStudentsFromDB = async () => {
  const result = await studentModel
    .find()
    .populate("AcademicSemester")
    .populate({
      path: "AcademicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getStudentFromDB = async (id: string) => {
  const result = await studentModel
    .findOne({ id })
    .populate("AcademicSemester")
    .populate({
      path: "AcademicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<Student>) => {
  const result = await studentModel
    .findOneAndUpdate({ id })
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await studentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB
};
