const mongoose = require("mongoose");

const thingsToDoSchema = mongoose.Schema({
  isChecked: {
    type: Boolean,
  },
  item: {
    type: String,
  },
});
const bucketListSchema = mongoose.Schema({
  userId: String,
  imgSrc: {
    public_id: String,
    url: String,
  },
  name: String,
  description: String,
  category: String,
  targetDate: String,
  website: String,
  budget: String,
  thingsToDo: [thingsToDoSchema],
  isPending: Boolean,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const BucketList = mongoose.model("bucket-lists", bucketListSchema);

module.exports = BucketList;
