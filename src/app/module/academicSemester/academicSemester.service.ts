import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const academicSemesterIntoDB = async (payload: TAcademicSemester) => {
    
  //semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST,"Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getAnAcademicSemesterFromDB = async (id: string)=> {
  const result = await AcademicSemester.findOne({id})
  return result;
}

const updateAcademicSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>) => {
  if(
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name]!== payload.code
  ) {
    throw new AppError(httpStatus.BAD_REQUEST,'Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({_id: id}, payload, {new: true})
  return result
}

export const AcademicSemesterService = {
  academicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getAnAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB
};
