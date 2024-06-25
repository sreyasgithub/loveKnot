const express = require("express");
const userCtrl = require("../controllers/user.ctrl");
const {
  default: userSchemaValidation,
} = require("../models/validations/user.validate");
const userRouter = express.Router();
const multer = require("multer");

const imgStorage = multer.memoryStorage();
const imgUpload = multer({ storage: imgStorage });
userRouter.post("/sign-up", userCtrl.signUp);
userRouter.post("/connect", userCtrl.connect);
userRouter.put("/create/:userId", imgUpload.single("imgSrc"), userCtrl.create);
userRouter.put("/edit/:userId", userCtrl.editUser);
userRouter.put(
  "/profile-img/edit/:userId",
  imgUpload.single("profileImg"),
  userCtrl.editProfileImg
);
userRouter.post("/login", userCtrl.login);
userRouter.put("/partner/disconnect/:userId", userCtrl.disconnect);
userRouter.put("/partner/delete/:userId", userCtrl.deletePartner);
userRouter.get("/profile/:userId", userCtrl.userProfile);

module.exports = userRouter;
