const { Thought, User } = require('../models');

const thoughtController = {
  // GET /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET /api/thoughts/:thoughtId
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST /api/thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          thought.username,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // PUT /api/thoughts/:thoughtId
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE /api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        return User.findByIdAndUpdate(
          thought.username,
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST /api/thoughts/:thoughtId/reactions
  createReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
