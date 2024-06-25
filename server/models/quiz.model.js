const { boolean } = require("joi");
const mongoose = require("mongoose");

const choiceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  choice: {
    type: String,
    required: true,
  },
});
const QuizSchema = mongoose.Schema({
  level: {
    type: Number,
  },
  question: {
    type: String,
  },
  options: {
    type: [String],
  },
  choices: [choiceSchema],
  matched: {
    type: Boolean,
  },
  quizId: {
    type: String,
  },
  score: {
    type: Number,
  },
  totalQuestions: {
    type: Number,
  },
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;
