import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { courseModel } from "../Course/course.model";
import { academicFaculty } from "../academicFaculty/academicFaculty.model";
import { Faculty } from "../Faculty/faculty.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    AcademicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  //check if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester Registration is not found !"
    );
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester;

  if (!academicSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic Semester is not found !"
    );
  }
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic Department is not found !"
    );
  }
  const isCourseExists = await courseModel.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course is not found !");
  }
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found !");
  }
  const isAcademicFacultyExists =
    await academicFaculty.findById(AcademicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found !");
  }

  //check if the department is belong to the faculty
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    AcademicFaculty,
  });
  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, `This ${isAcademicDepartmentExists.name} does not belong to this ${isAcademicFacultyExists.name}`);
  }

  //check if the offered course same section in same registered semester exists
  const iSameOfferedCourseExistsWithSameRegisterWithSameSection = await OfferedCourse.findOne({
    SemesterRegistration,
    section,
    course,
  })
  if (!iSameOfferedCourseExistsWithSameRegisterWithSameSection) {
    throw new AppError(httpStatus.NOT_FOUND, `Offered course with same section is already exists!`);
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
