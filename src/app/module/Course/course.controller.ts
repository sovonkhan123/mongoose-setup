import { catchAsync } from "../../utils/CatchAsync";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Course is created successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourseFromDB(req.query);

  res.status(200).json({
    success: true,
    message: "Courses are retrieved successfully",
    data: result,
  });
});

const getSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDB(id);

  res.status(200).json({
    success: true,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const deleteCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourseFromDB(id);

  res.status(200).json({
    success: true,
    message: "Course is deleted successfully",
    data: result,
  });
});

const updateCourses = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updateCourseFromDB(id, req.body);

  res.status(200).json({
    success: true,
    message: "Course is updated successfully",
    data: result,
  });
});

const assignFaculties = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultiesInDB(id, faculties);

  res.status(200).json({
    success: true,
    message: "Faculties assigned successfully",
    data: result,
  });
});

const removeFaculties = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.removeFacultiesFromDB(id, faculties);

  res.status(200).json({
    success: true,
    message: "Faculties removed successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deleteCourses,
  updateCourses,
  assignFaculties,
  removeFaculties,
};
