import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reminder } from "../models/Reminder.js";

const createReminder = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if ([title].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Title is required");
  }
  const reminder = await Reminder.create({
    title,
    description,
    user: req.user._id,
  });

  const createdReminder = await Reminder.findById(reminder._id);

  if (!createdReminder) {
    throw new ApiError(500, "Something went wrong while creating the reminder");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdReminder, "Reminder created successfully")
    );
});

const getReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.find({
    user: req.user._id,
    isDeleted: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, reminder, "Reminder retrieved successfully"));
});

const updateReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
});

const deleteReminder = asyncHandler(async (req, res) => {});

export { createReminder, getReminder, updateReminder, deleteReminder };
