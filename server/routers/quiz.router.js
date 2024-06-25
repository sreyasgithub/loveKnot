const express = require("express");

const QuizsCtrl = require("../controllers/quiz.ctrl");

const quizRouter = express.Router();

quizRouter.post("/create/:level/:quizId", QuizsCtrl.handleQuiz);

quizRouter.get("/all/:level", QuizsCtrl.fetchLevel);

quizRouter.post("/match/:level/:quizId", QuizsCtrl.match);
quizRouter.put("/reset/:level/:userId", QuizsCtrl.reset);

module.exports = quizRouter;
