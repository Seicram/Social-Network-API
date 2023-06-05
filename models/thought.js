const mongoose = require('mongoose');

// thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },

    // createdAt set to current date and time
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp)
  },

  // username (the user that created this thought)
  username: {
    type: String,
    required: true
  },

  // reactions array
  reactions: [reactionSchema]
});

// Create a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thought model using the thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
