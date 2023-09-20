const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's 'todos' array
const todoSchema = new Schema({
  item: {
    type: String,
    required: 'You need to create a todo item',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  // ability to mark item as completed or not
  completed: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

module.exports = todoSchema;