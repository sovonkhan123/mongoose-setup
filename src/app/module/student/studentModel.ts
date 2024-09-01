import { Schema, model } from "mongoose";
import validator from "validator";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
  stuModel,
} from "./studentInterface";

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
    trim: true,
    required: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not capitalize format",
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const studentSchema = new Schema<Student, stuModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    unique: true,
    ref: "User",
  },
  name: { type: nameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not valid email type",
    },
  },
  contractNo: {
    type: String,
    required: true,
  },
  emargencyContractNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String },
  AcademicSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
  },
  AcademicDepartment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepartment",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await studentModel.findOne({ id });
  return existingUser;
};

// creating a custom instance method

// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await studentModel.findOne({id: id});
//   return existingUser
// };

export const studentModel = model<Student, stuModel>("student", studentSchema);
