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
    firstName: z.string().refine(
      value => value.charAt(0) === value.charAt(0).toUpperCase(),
      { message: 'First name must be capitalized' }
    ),
    middleName: z.string(),
    lastName: z.string().refine(
      value => /^[a-zA-Z]+$/.test(value),
      { message: 'Last name must only contain letters' }
    ),
  });
  
  const studentValidationSchema = z.object({
    id: z.string(),
    password: z.string(),
    name: nameValidationSchema,
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contractNo: z.string(),
    emargencyContractNo: z.string(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    permanentAddress: z.string(),
    presentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(["active", "inactive"]).default("active"),
  });

  export default studentValidationSchema;