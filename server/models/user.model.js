const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  profileImg: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  code: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  meetDate: {
    type: String,
  },
  isAdult: {
    type: Boolean,
  },
  partner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    connected: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
