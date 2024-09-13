import { catchAsync } from "../../utils/CatchAsync";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationFromDB(
      req.body
    );

  res.status(200).json({
    success: true,
    message: "Semester is registered successfully",
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDB(req.query);

    res.status(200).json({
        success: true,
        message: "Semester are retrieved successfully",
        data: result,
      });
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const {id} = req.params
    const result =await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id)
    
    res.status(200).json({
        success: true,
        message: "Semester is retrieved successfully",
        data: result,
      });
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id, req.body)

    res.status(200).json({
        success: true,
        message: "Semester is retrieved successfully",
        data: result,
      });
})

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration
};
