const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routers/user.router");
const photoJournalCtrl = require("./controllers/photoJournal.ctrl");
const photoJournalRouter = require("./routers/photoJournal.router");
const bucketListRouter = require("./routers/bucketList.router");

const quizRouter = require("./routers/quiz.router");

const app = express();

// Parse JSON bodies

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static("uploads/photos/"));
app.use(express.static("uploads/music/"));
app.use(express.static("/uploads/user-profile/"));
app.use("/api", userRouter);
app.use("/api/photo-journal", photoJournalRouter);
app.use("/api/bucket-list", bucketListRouter);
app.use("/api/quiz", quizRouter);
const mongooseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sreyaDB:2UelDkU3FiQxwxck@p1cluster.7qe1ba0.mongodb.net/love-knot?retryWrites=true&w=majority&appName=p1Cluster"
    );
    console.log("mogoDB connected");
  } catch (err) {
    console.log(err);
  }
};

mongooseConnection();

app.listen(4000, () => {
  console.log("CE services connected");
});
