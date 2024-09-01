import { z } from "zod";

const localGuardianValidationSchema = z.object({
  name: z.string(),
  accupation: z.string(),
  contractNo: z.string(),
  address: z.string(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContractNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContractNo: z.string(),
});

const nameValidationSchema = z.object({
  firstName: z
    .string()
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: "First name must be capitalized",
    }),
  middleName: z.string(),
  lastName: z.string().refine((value) => /^[a-zA-Z]+$/.test(value), {
    message: "Last name must only contain letters",
  }),
});

const studentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: nameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contractNo: z.string(),
      emargencyContractNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      AcademicSemester: z.string(),
      AcademicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});


const localGuardianUpdateValidationSchema = z.object({
  name: z.string().optional(),
  accupation: z.string().optional(),
  contractNo: z.string().optional(),
  address: z.string().optional(),
});

const guardianUpdateValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContractNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContractNo: z.string().optional(),
});

const nameUpdateValidationSchema = z.object({
  firstName: z
    .string()
    .optional()
    .refine((value) => !value ||value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: "First name must be capitalized",
    }),
  middleName: z.string().optional(),
  lastName: z.string().optional().refine((value) => !value || /^[a-zA-Z]+$/.test(value), {
    message: "Last name must only contain letters",
  }),
});

const studentUpdateValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: nameUpdateValidationSchema.optional(),
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contractNo: z.string().optional(),
      emargencyContractNo: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      permanentAddress: z.string().optional(),
      presentAddress: z.string().optional(),
      guardian: guardianUpdateValidationSchema.optional(),
      localGuardian: localGuardianUpdateValidationSchema.optional(),
      AcademicSemester: z.string().optional(),
      AcademicDepartment: z.string().optional(),
      profileImg: z.string().optional(),
    }).optional(),
  }).optional(),
});

// Example usage to validate an object
export const studentValidations = {
  studentValidationSchema,
  studentUpdateValidationSchema
};
