const express = require("express");

const PhotoJournal = require("../models/photoJournal.model");
const User = require("../models/user.model");
const responseSvc = require("../services/response.svc");
const formattedItemsSvc = require("../services/dataWithUserDetails.svc");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const DataURIParser = require("datauri/parser");
const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extname = path.extname(file.originalname).toString();
  return parser.format(extname, file.buffer);
};
cloudinary.config({
  cloud_name: "dckxpjps4",
  api_key: "814585451719133",
  api_secret: "ni2wrPtYZFLwSuO7wW9ZtTv2GbU",
});

const photoJournalCtrl = {
  create: async (req, res) => {
    try {
      const file = getDataUri(req.file);
      const cdb = await cloudinary.uploader.upload(file.content, {
        folder: "photo-journal",
        resource_type: "image",
      });
      req.body.imgSrc = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      await PhotoJournal.create({ ...req.body, imgSrc: req.body.imgSrc });

      responseSvc.successMsg(res, "Posted successfully");
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },

  editPhotoJournal: async (req, res) => {
    const journal = await PhotoJournal.findById(req.params.journalId);

    try {
      if (journal) {
        if (req.file) {
          const file = getDataUri(req.file);
          if (journal.imgSrc.public_id) {
            await cloudinary.uploader.destroy(journal.imgSrc.public_id);
          }
          const cdb = await cloudinary.uploader.upload(file.content, {
            folder: "photo-journal",
            resource_type: "image",
          });

          req.body.imgSrc = {
            public_id: cdb.public_id,
            url: cdb.secure_url,
          };
        }
        await PhotoJournal.findOneAndUpdate(
          { _id: req.params.journalId },
          req.body
        );

        responseSvc.successMsg(res, "Post edited successfully");
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },

  fetchAll: async (req, res) => {
    try {
      const posts = await PhotoJournal.find();

      const allPosts = await formattedItemsSvc.includePostedBy(
        res,
        posts,
        User
      );
      const x = { posts: allPosts };
      console.log();
      res.status(200);
      res.json({
        status: "Retrieved Successfully",
        ...x,
      });
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const post = await PhotoJournal.findByIdAndDelete(req.params.journalId);

      if (post) {
        responseSvc.successData(res, "Post deleted successfully", post._doc);
      } else {
        responseSvc.clientError(res, "Post already deleted");
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },
};

module.exports = photoJournalCtrl;
