const mongoose = require('mongoose');

// thought schema
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },

  // reactionBody
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },

  // username (the user that created this thought)
  username: {
    type: String,
    required: true
  },

  // createdAt set to current date and time
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp) // Define your own formatting function
  }
});

// Create a virtual called reactionCount
module.exports = reactionSchema;
