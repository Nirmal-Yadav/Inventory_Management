import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
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

router.route("/login").post(loginUser);

export default router;

// router.route("/register").post(
//     upload.array("user_images", 5), // "user_images" is the name in form-data, 5 is the max files
//     registerUser
//   );
// for multiple image
