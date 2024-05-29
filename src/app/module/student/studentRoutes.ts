import express from "express";
import { StudentController } from "./studentController";

const router = express.Router();

router.post("/create-student", StudentController.createStudent);

export const studentRoutes = router;
