
import { Model } from 'mongoose';
import { studentModel } from './studentModel';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContractNo: string;
  motherName: string;
  motherOccupation: string;
  motherContractNo: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  accupation: string;
  contractNo: string;
  address: string;
};

export type Student = {
  id: string;
  password: string;
  name: UserName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contractNo: string;
  emargencyContractNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: "active" | "inactive";
};

// for creating static

export interface stuModel extends Model<Student> {
  isUserExists(id: string): Promise<Student| null>
}

// for creating instance

// export type studentMethods = {
//   isUserExits(id: string): Promise<Student | null>
// }

// export type sModel = Model<Student,Record<string, never>, studentMethods> 
