const express = require("express");
const multer = require("multer");
const bucketListCtrl = require("../controllers/bucketList.ctrl");

const bucketListRouter = express.Router();

const imgStorage = multer.memoryStorage();
const upload = multer();
const imgUpload = multer({ storage: imgStorage });
bucketListRouter.post(
  "/create",
  imgUpload.single("imgSrc"),
  bucketListCtrl.create
);

bucketListRouter.get("/all", bucketListCtrl.fetchAll);
bucketListRouter.patch(
  "/achieve/:itemId",
  upload.none(),
  bucketListCtrl.achieved
);
bucketListRouter.patch("/update/:itemId", upload.none(), bucketListCtrl.update);
bucketListRouter.delete("/delete/:itemId", bucketListCtrl.delete);
bucketListRouter.patch(
  "/update/:itemId/thingsToDo/:toDoItemId",
  bucketListCtrl.updateThingsToDo
);

module.exports = bucketListRouter;
