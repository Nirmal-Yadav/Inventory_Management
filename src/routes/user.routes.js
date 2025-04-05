import express from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// router.post("/register", registerUser);
router.route("/register").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;

// router.route("/register").post(
//     upload.array("user_images", 5), // "user_images" is the name in form-data, 5 is the max files
//     registerUser
//   );
// for multiple image
