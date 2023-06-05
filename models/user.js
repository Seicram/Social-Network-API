const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  // email validation
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },

  // thoughts array
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],

  // friends array
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// virtual called friendCount
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = mongoose.model('User', userSchema);

// export the User model
module.exports = User;
