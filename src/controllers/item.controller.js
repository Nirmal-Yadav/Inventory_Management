import { Item } from "../models/item.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItems = asyncHandler(async (req, res) => {
  const { name, quantity, price } = req.body;

  const existingItem = Item.findOne({ name });

  if (existingItem) {
    new ApiError(400, "item already exists");
  }

  if ([name, quantity, price].some((field) => field == "")) {
    new ApiError(400, "All fields are required");
  }

  const newItem = await Item.create({
    name,
    quantity,
    price,
  });

  if (!newItem) {
    new ApiError(404, "error while creating item");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { newItem }, "new item added sucessfully"));
});

const updateItem = asyncHandler(async (req, res) => {
  const { id, quantity, price } = req.body;

  if (!id) {
    throw new ApiError(400, "item id required");
  }

  const item = await Item.findById(id);
  if (!item) {
    new ApiError(404, "item not found");
  }

  const updatedItem = await Item.findByIdAndUpdate(
    id,
    {
      quantity: item.quantity + quantity,
      price,
    },
    {
      new: true, // return the updated document
      runValidators: true, // run schema validators
    }
  );

  if (!updatedItem) {
    new ApiError(404, "item not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedItem, "item updated succesfully"));
});

export { addItems, updateItem };
