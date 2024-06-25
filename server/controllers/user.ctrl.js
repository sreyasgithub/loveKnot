const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const responseSvc = require("../services/response.svc");
const BucketList = require("../models/bucketList.model");
const PhotoJournal = require("../models/photoJournal.model");
const Joi = require("joi");
const userSchemaValidation = require("../models/validations/user.validate");
const DataURIParser = require("datauri/parser");
const path = require("path");
const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extname = path.extname(file.originalname).toString();
  return parser.format(extname, file.buffer);
};

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dckxpjps4",
  api_key: "814585451719133",
  api_secret: "ni2wrPtYZFLwSuO7wW9ZtTv2GbU",
});

const userCtrl = {
  signUp: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (userSchemaValidation.validate(req.body).error) {
        responseSvc.clientError(
          res,
          userSchemaValidation
            .validate(req.body)
            .error?.message.replaceAll('"', "")
        );
      } else {
        if (user) {
          responseSvc.clientError(res, "User already registered");
        } else {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          req.body.password = hashedPassword;

          const code = Math.floor(100000 + Math.random() * 900000);

          let newUser = new User({
            ...req.body,
          });
          newUser.code = code;
          newUser.save();
          const dataObj = { user: newUser };
          responseSvc.successData(res, "Registered succesfully", dataObj);
        }
      }
    } catch (error) {
      console.log(error);
      responseSvc.serverError(res.error);
    }
  },
  connect: async (req, res) => {
    try {
      const { partnerCode, userId } = req.body;
      const userPartner = await User.findOne({ code: partnerCode });
      const user = await User.findById(userId);

      if (!userPartner) {
        responseSvc.clientError(res, "Invalid Code");
      } else {
        // const partner = await User.findOne({ partner: { connected: true } });

        if (!userPartner?.partner?.connected) {
          await User.findOneAndUpdate(
            { code: partnerCode },
            {
              partner: {
                id: userId,
                connected: true,
              },
            },
            {
              new: true,
            }
          );
          await User.findOneAndUpdate(
            { _id: userId },
            {
              partner: {
                id: userPartner._id,
                connected: true,
              },
            },
            {
              new: true,
            }
          );
          const updatedUser = await User.findById(userId);

          const dataObj = { partner: updatedUser.partner };
          await responseSvc.successData(res, "Connected Successfully", dataObj);
        } else {
          responseSvc.clientError(res, "Partner already connected");
        }
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },

  create: async (req, res) => {
    console.log(req.body);

    try {
      const { email, ...rest } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        const { isAdult } = req.body;
        if (isAdult) {
          if (req.file) {
            const file = getDataUri(req.file);
            const cdb = await cloudinary.uploader.upload(file.content, {
              folder: "user-profile",
              resource_type: "image",
            });

            req.body.profileImg = {
              public_id: cdb.public_id,
              url: cdb.secure_url,
            };
          }
          await User.findOneAndUpdate(
            { email },
            { ...rest, profileImg: req.body.profileImg }
          );
          const token = jwt.sign(req.body, "hi,am a user", {
            expiresIn: "24hr",
          });
          const updatedUser = await User.findOne({ email });

          const dataObj = {
            user: {
              ...updatedUser._doc,
              token,
            },
          };
          responseSvc.successData(res, "Created Successfully", dataObj);
        } else {
          responseSvc.clientError(
            res,
            "Please confirm that you are 18 or above"
          );
        }
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },
  editProfileImg: async (req, res) => {
    const user = await User.findById(req.params.userId);

    try {
      if (user) {
        const file = getDataUri(req.file);
        const cdb = await cloudinary.uploader.upload(file.content, {
          folder: "user-profile",
          resource_type: "image",
        });
        if (user.profileImg.public_id) {
          await cloudinary.uploader.destroy(user.profileImg.public_id);
        }
        user.profileImg = {
          public_id: cdb.public_id,
          url: cdb.secure_url,
        };

        user.save();

        responseSvc.successData(res, "edited profile img Successfully");
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },
  editUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (user) {
        await User.findOneAndUpdate({ _id: req.params.userId }, req.body);

        const updatedUser = await User.findById(req.params.userId);

        const dataObj = {
          user: {
            ...updatedUser._doc,
          },
        };
        responseSvc.successData(res, "edited user Successfully", dataObj);
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (userSchemaValidation.validate(req.body).error) {
        responseSvc.clientError(
          res,
          userSchemaValidation
            .validate(req.body)
            .error?.message.replaceAll('"', "")
        );
      } else {
        if (user) {
          console.log(user);

          const similarPassword = await bcrypt.compare(password, user.password);
          if (similarPassword) {
            const token = jwt.sign({ user }, "hi,am a user", {
              expiresIn: "24hr",
            });

            const dataObj = {
              ...user._doc,
              token,
            };
            responseSvc.successData(res, "Login Successfull", dataObj);
          } else {
            responseSvc.clientError(res, "Incorrect Password");
          }
        } else {
          responseSvc.clientError(res, "User not found");
        }
      }
    } catch (error) {
      console.log(error);
      responseSvc.serverError(res, error);
    }
  },
  userProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (user) {
        const dataObj = { profile: user };
        responseSvc.successData(res, "Profile fetched successfully", dataObj);
      } else {
        responseSvc.clientError(res, "User Not found");
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },

  disconnect: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            partner: {
              id: user.partner.id,
              connected: false,
            },
          },
          { new: true }
        );
        const { partner, _id, email } = updatedUser;

        const dataObj = { user: { partner, _id, email } };
        responseSvc.successData(res, "Disconnected successfully", dataObj);
      } else {
        responseSvc.clientError(res, "User Not found");
      }
    } catch (error) {
      responseSvc.serverError(res.error);
    }
  },

  deletePartner: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const code = Math.floor(100000 + Math.random() * 900000);
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            code,
            partner: null,
          },
          { new: true }
        );

        const { partner, _id, email } = updatedUser;

        const dataObj = { user: { partner, _id, email, code } };
        await BucketList.deleteMany();
        await PhotoJournal.deleteMany();
        responseSvc.successData(res, "Deleted successfully", dataObj);
      } else {
        responseSvc.clientError(res, "User Not found");
      }
    } catch (error) {
      responseSvc.serverError(res.error);
    }
  },
};

module.exports = userCtrl;
