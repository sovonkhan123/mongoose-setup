import { studentModel } from "./studentModel";
import { Student } from "./studentInterface";

const creatStudentIntoDB = async (student: Student) => {
  const result = await studentModel.create(student);
  return result;
};

export const StudentServices = {
  creatStudentIntoDB,
};
