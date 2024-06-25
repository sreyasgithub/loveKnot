const mongoose = require("mongoose");

const photoJournalSchema = mongoose.Schema({
  imgSrc: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  caption: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
  },
  postedOn: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
  musicSrc: {
    type: String,
  },
});

const PhotoJournal = mongoose.model("photo-journals", photoJournalSchema);
module.exports = PhotoJournal;
