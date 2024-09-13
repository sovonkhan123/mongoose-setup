import { model, Schema } from "mongoose";
import {
  CourseFaculty,
  TCourse,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const courseModel = model<TCourse>("Course", courseSchema);

const courseFacultySchema = new Schema<CourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  faculties: {
    type: [Schema.Types.ObjectId],
    ref: "Faculty",
  },
});

export const FacultyModel = model<CourseFaculty>('CourseFaculty', courseFacultySchema)
