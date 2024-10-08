import { z } from "zod";
import { Days } from "./offeredCourse.constant";
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      AcademicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string().optional(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.enum([...Days] as [string, ...string[]]),
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01][0-9]|2[0-3]) : ([0-5][0-9])$/;
          return regex.test(time);
        },
        {
          message:
            "invalid time format , expected 'HH':'MM' in 24 hours format",
        }
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01][0-9]|2[0-3]) : ([0-5][0-9])$/;
          return regex.test(time);
        },
        {
          message:
            "invalid time format , expected 'HH':'MM' in 24 hours format",
        }
      ),
    })
    .refine(( body ) => {
      const start = new Date(`1998-10-14T${body.startTime}:00`);
      const end = new Date(`1998-10-14T${body.endTime}:00`);
      return end > start;
    }, {
      message: "Start time must be before end time !"
    }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidationSchema = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
