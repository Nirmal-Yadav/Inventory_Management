// //   const populatedBill = await Bill.findById(bill._id).populate({
// //     path: "items",
// //     populate: {
// //       path: "item", // this is the field inside BillItem that references the actual Item
// //       model: "Item",
// //     },
// //   });

import { Bill } from "../models/bill.model.js";
import { Item } from "../models/item.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBill = asyncHandler(async (req, res) => {
  const { items } = req.body;

  let totalAmount = 0;
  const billItems = [];

  for (let item of items) {
    const dbItem = await Item.findById(item.id);

    if (!dbItem || dbItem.quantity < item.quantity) {
      throw new ApiError(400, "Insufficient quantity");
    }

    dbItem.quantity -= item.quantity;
    await dbItem.save({ validateBeforeSave: false });

    totalAmount += dbItem.price * item.quantity;

    billItems.push({
      productId: dbItem._id,
      quantity: item.quantity,
      name: dbItem.name,
    });
  }

  const bill = await Bill.create({
    items: billItems,
    totalAmount,
  });

  await bill.save({ validateBeforeSave: false });

  const populatedBill = await Bill.findById(bill._id).populate({
    path: "items.productId",
    select: "price", // only fetch name and price if needed
  });
  res
    .status(200)
    .json(
      new ApiResponse(200, { bill: populatedBill }, "Bill created successfully")
    );
});

export { createBill };
