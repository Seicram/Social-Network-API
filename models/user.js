const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]+$/
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual property to get the count of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Middleware to remove associated thoughts when a user is deleted
userSchema.pre('remove', async function (next) {
  await this.model('Thought').deleteMany({ username: this.username });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

