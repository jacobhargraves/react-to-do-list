const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // query to find all users
    users: async () => {
      return User.find();
    },
    // query to find user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    // query to find user by the user id if there is a user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // mutation to add user with their username, email, password
    addUser: async (parent, { username, email, password }) => {
      // create user
      const user = await User.create({ username, email, password });
      // assign the user a token
      const token = signToken(user);
      return { token, user };
    },
    // mutation to login user by email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      // error message if no user by input found
      if (!user) {
          throw new AuthenticationError('No user found with this email address');
      }
      // uses middleware to compare passwords
      const correctPw = await user.isCorrectPassword(password);
      // error message if password is incorrect
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // assign user a token
      const token = signToken(user);  

      return { token, user };
    },
    // mutation to add a todo item
    addTodo: async (parent, { userId, item }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: userId},
          {$addToSet: { todos: { item, completed: false } }},
          {new: true, runValidators: true,}
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // mutation to delete a todo item
    deleteTodo: async (parent, { userId, todoId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {_id: userId},
          {$pull: {todos: {_id: todoId},},},
          {new: true}
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
