import { Schema, model } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./studentInterface";

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  accupation: {
    type: String,
    required: true,
  },
  contractNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContractNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContractNo: {
    type: String,
    required: true,
  },
});

const nameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: { type: nameSchema },
  gender: ["male", "female"],
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contractNo: {
    type: String,
    required: true,
  },
  emargencyContractNo: {
    type: String,
    required: true,
  },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  permanentAddress: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  guardian: { type: guardianSchema },
  localGuardian: { type: localGuardianSchema },
  profileImg: { type: String },
  isActive: ["active", "inactive"],
});

export const studentModel = model<Student>("student", studentSchema);
