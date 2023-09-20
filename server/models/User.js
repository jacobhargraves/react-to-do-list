const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Todo.js
const todoSchema = require('./Todo');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  todos: [todoSchema] ,
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `todoCount` with the number of todos we have
userSchema.virtual('todoCount').get(function () {
  return this.todos.length;
});

const User = model('User', userSchema);

module.exports = User;
