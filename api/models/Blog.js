const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  Content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
