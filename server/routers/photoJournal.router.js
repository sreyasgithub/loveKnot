const express = require("express");
const multer = require("multer");
const photoJournalCtrl = require("../controllers/photoJournal.ctrl");
const photoJournalRouter = express.Router();

const imgStorage = multer.memoryStorage();

const musicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/music/"); // Directory to save the files
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.body.imgSrc = uniquePrefix + "-" + file.originalname;
    cb(null, req.body.imgSrc);
  },
});

// File filter to only accept audio files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|ogg/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Audio files only!");
  }
};

// Set up the upload variable
const musicUpload = multer({
  storage: musicStorage,
  // limits: { fileSize: 10000000 }, // Limit file size to 10MB
  // fileFilter: fileFilter,
});

const imgUpload = multer({ storage: imgStorage });

photoJournalRouter.post(
  "/create",
  imgUpload.single("imgSrc"),
  photoJournalCtrl.create
);

photoJournalRouter.put(
  "/edit/:journalId",
  imgUpload.single("imgSrc"),
  photoJournalCtrl.editPhotoJournal
);
photoJournalRouter.delete("/delete/:journalId", photoJournalCtrl.delete);
photoJournalRouter.get("/all", photoJournalCtrl.fetchAll);

module.exports = photoJournalRouter;
