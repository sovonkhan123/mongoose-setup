import { model, Schema } from "mongoose";
import { AcademicSemesterCode, AcademicSemesterName, months } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists =await AcademicSemester.findOne({
    year: this.year,
    name: this.name
  })
  if(isSemesterExists){
    throw new AppError(httpStatus.ALREADY_REPORTED,'Semester is already exists !')
  }
  next();
})

 export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
