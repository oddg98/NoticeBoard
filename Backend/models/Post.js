const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postedOn: {
    type: Date,
    default: Date.now,
  },
  postTitle: {
    type: String,
    required: false,
    min: 1,
    max: 100,
  },
  postAuthor: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
    min: 1,
    max: 500,
  },
});

module.exports = mongoose.model("Post", postSchema);
