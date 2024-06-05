import { studentModel } from "./studentModel";
import { Student } from "./studentInterface";

const creatStudentIntoDB = async (studentData: Student) => {

    if (await studentModel.isUserExists(studentData.id)){
        throw new Error('User already exists')
    }
    const result = await studentModel.create(studentData);

//   create an instance

//   const student = new studentModel(studentData);

//   if(await student.isUserExits(studentData.id)) {
//     throw new Error('user already exists!')
//   }
  
  
// built in instance method  
//   const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await studentModel.find();
  return result;
};

const getStudentFromDB = async (id: String) => {
  const result = await studentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  creatStudentIntoDB,
  getStudentFromDB,
};
