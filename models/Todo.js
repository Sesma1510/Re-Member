const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  dayAdd: {
    type: Date,
    default: new Date(),
  },
  interval: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema, "Users_Todo");
