const BucketList = require("../models/bucketList.model");
const User = require("../models/user.model");
const formattedItemsSvc = require("../services/dataWithUserDetails.svc");
const getDataUri = require("../services/getDataUri.svc");
const responseSvc = require("../services/response.svc");
const cloudinary = require("cloudinary").v2;
const bucketListCtrl = {
  create: async (req, res) => {
    try {
      let file;
      let cdb;
      if (req.file) {
        file = getDataUri(req.file);
      }
      if (file) {
        cdb = await cloudinary.uploader.upload(file.content, {
          folder: "bucket-list_cover-photo",
          resource_type: "image",
        });
      }

      if (cdb) {
        req.body.imgSrc = {
          public_id: cdb.public_id,
          url: cdb.secure_url,
        };
      }
      await BucketList.create({
        ...req.body,
        imgSrc: req.body.imgSrc,
        isPending: true,
      });

      responseSvc.successMsg(res, "bucket list itePosted successfully");
    } catch (error) {
      console.log(error.message);
      responseSvc.serverError(res, error);
    }
  },
  fetchAll: async (req, res) => {
    try {
      // Retrieve posts along with associated user information
      const items = await BucketList.find();

      const allItems = await formattedItemsSvc.includePostedBy(
        res,
        items,
        User
      );
      const dataObj = { posts: allItems };
      responseSvc.successData(
        res,
        "Bucket-list items retrieved successfully",
        dataObj
      );
    } catch (err) {
      responseSvc.serverError(res.error);
    }
  },
  update: async (req, res) => {
    try {
      const listItem = await BucketList.findById(req.params.itemId);
      console.log("listItem", listItem);
      if (listItem) {
        for (const key in req.body) {
          if (key === "thingsToDo") {
            for (let i = 0; i < listItem[key].length; i++) {
              listItem[key][i] = req.body[key][i];
            }
          }
          listItem[key] = req.body[key];
        }
        const updatedItem = await BucketList.findByIdAndUpdate(
          req.params.itemId,
          listItem,
          {
            new: true,
          }
        );
        const dataObj = { updatedItem };
        responseSvc.successData(res, "Item updated successfully", dataObj);
      } else {
        responseSvc.clientError(res, "Item not found");
      }
    } catch (error) {
      responseSvc.serverError(res, error);
    }
  },

  updateThingsToDo: async (req, res) => {
    const { itemId, toDoItemId } = req.params;
    console.log("itemId", itemId);
    const { isChecked, item } = req.body;

    try {
      const post = await BucketList.findById(itemId);
      console.log("post", post);
      if (!post) {
        return res.status(404).send("Bucket List Item not found");
      }

      const todoItem = post.thingsToDo.id(toDoItemId);
      if (!todoItem) {
        return res.status(404).send("To-Do item not found");
      }

      if (isChecked !== undefined) {
        todoItem.isChecked = isChecked;
      }

      if (item !== undefined) {
        todoItem.item = item;
      }

      await post.save();
      res.send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  achieved: async (req, res) => {
    try {
      const listItem = await BucketList.findById(req.params.itemId);
      if (listItem) {
        const achievedItem = await BucketList.findByIdAndUpdate(
          req.params.itemId,
          { isPending: false },
          {
            new: true,
          }
        );
        const { name, budget, _id } = achievedItem;
        const dataObj = { achievedItem: { name, budget, _id } };
        responseSvc.successData(res, "Item achieved successfully", dataObj);
      } else {
        responseSvc.clientError(res, "Item not found");
      }
    } catch (error) {
      responseSvc.serverError(res.error);
    }
  },
  delete: async (req, res) => {
    try {
      const listItem = await BucketList.findById(req.params.itemId);
      if (listItem) {
        const deletedItem = await BucketList.findByIdAndDelete(
          req.params.itemId
        );
        const { name, budget, _id } = deletedItem;
        const dataObj = {
          deletedItem: {
            name,
            budget,
            _id,
          },
        };
        responseSvc.successData(
          res,
          "Bucket-list item deleted successfully",
          dataObj
        );
      } else {
        responseSvc.clientError(res, "No item found with this ID");
      }
    } catch (error) {
      responseSvc.serverError(res.error);
    }
  },
};

module.exports = bucketListCtrl;
