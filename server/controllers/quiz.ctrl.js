const Quizs = require("../models/quiz.model");
const User = require("../models/user.model");
const formattedItemsSvc = require("../services/dataWithUserDetails.svc");
const responseSvc = require("../services/response.svc");

const QuizsCtrl = {
  handleQuiz: async (req, res) => {
    const { action, question, userId, choice } = req.body;
    const quizId = req.params.quizId;
    try {
      const levelNumber = req.params.level;
      const quiz = await Quizs.findOne({
        _id: quizId,
      });
      console.log(quiz);

      if (action === "create") {
        const QuizQ = await Quizs.findOne({
          question,
        });
        if (QuizQ) {
          responseSvc.clientError(res, "This Question is already created");
        } else {
          const data = {
            ...req.body,
            level: levelNumber,
            choices: [],
          };
          const newQuizQ = new Quizs(data);
          newQuizQ.save();
          responseSvc.successMsg(res, "Quiz question created successfully");
        }
      } else if (action === "choose") {
        const userQuiz = quiz?.choices?.find((item) => item.userId === userId);

        if (!userQuiz) {
          await Quizs.findByIdAndUpdate(
            quizId,
            { $push: { choices: { userId, choice } } },
            { new: true, useFindAndModify: false }
          );

          responseSvc.successMsg(res, "posted your choice");
        } else {
          responseSvc.successMsg(res, "already posted your choice");
        }
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },
  fetchLevel: async (req, res) => {
    try {
      // Retrieve posts along with associated user information
      const levelNumber = req.params.level;
      const quizs = await Quizs.find({ level: levelNumber });

      const dataObj = { data: { quizs, totalQuiz: quizs.length } };
      responseSvc.successData(
        res,
        "Quizs items retrieved successfully",
        dataObj
      );
    } catch (err) {
      responseSvc.serverError(res, error);
    }
  },
  match: async (req, res) => {
    const { userId, partnerId } = req.body;
    const quizId = req.params.quizId;
    const quiz = await Quizs.findOne({
      _id: quizId,
    });
    const partnerQuiz = quiz?.choices?.find(
      (item) => item.userId === partnerId
    );

    const userQuiz = quiz?.choices?.find((item) => item.userId === userId);

    if (partnerQuiz?.choice === userQuiz?.choice && partnerQuiz && userQuiz) {
      await Quizs.findByIdAndUpdate(quizId, { $set: { matched: true } });
      responseSvc.successMsg(
        res,
        "Your Choice is matched to your partners choice"
      );
    } else if (
      partnerQuiz?.choice !== userQuiz?.choice &&
      partnerQuiz &&
      userQuiz
    ) {
      await Quizs.findByIdAndUpdate(quizId, { $set: { matched: false } });
      responseSvc.successMsg(
        res,
        "your choice is not matched to your partners choice"
      );
    } else if (!partnerQuiz && userQuiz) {
      responseSvc.clientError(res, "your partner did'nt choose yet");
    }
  },

  reset: async (req, res) => {
    const userId = req.params.userId;

    await Quizs.updateMany({}, { $pull: { choices: { userId: userId } } });
    responseSvc.successMsg(
      res,
      `all your choosed options from level ${req.params.level} are cleared`
    );
  },
};

module.exports = QuizsCtrl;
