import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationFromDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a semester ${isThereAnyUpcomingOrOngoingSemester.status}`
    );
  }

  //check if the semester is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Semester is not found");
  }

  //check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "Semester is already exists");
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
    //check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    id
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This Semester is not found");
  }

  //if the requested semester registration is ended, we will not update anything
  const requestedSemester = await SemesterRegistration.findById(id);
  if (requestedSemester?.status === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This Semester is already ended"
    );
  }

  if(requestedSemester?.status === "UPCOMING" && payload?.status === "ENDED") {
    throw new AppError(
        httpStatus.BAD_REQUEST,
        `you can't change status from ${requestedSemester?.status} to ${payload?.status}`
      );
  }
  if(requestedSemester?.status === "ONGOING" && payload?.status === "UPCOMING") {
    throw new AppError(
        httpStatus.BAD_REQUEST,
        `you can't change status from ${requestedSemester?.status} to ${payload?.status}`
      );
  }


  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  getAllSemesterRegistrationFromDB,
  createSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
