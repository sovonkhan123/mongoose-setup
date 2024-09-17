import { Router } from "express";
import { UserRoutes } from "../module/user/UserRoutes";
import { studentRoutes } from "../module/student/studentRoutes";
import { academicSemesterRoutes } from "../module/academicSemester/academicSemester.routes";
import { AcademicFacultyRoutes } from "../module/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentRoutes } from "../module/academicDepartment/academicDepartment.routes";
import { CourseRoutes } from "../module/Course/course.routes";
import { RegisteredRoutes } from "../module/semesterRegistration/semesterRegistration.routes";
import { FacultyRoutes } from "../module/Faculty/faculty.routes";
import { OfferedCourseRoutes } from "../module/offeredCourse/offeredCourse.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: studentRoutes,
  },
  {
    path: "/academic-semesters",
    route: academicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/academic",
    route: RegisteredRoutes,
  },
  {
    path: "/offered-course",
    route: OfferedCourseRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
