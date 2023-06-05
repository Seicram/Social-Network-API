const mongoose = require('mongoose');

// thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },

  // createdAt field
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp)
  },

  // username field
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
});

// Create a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;