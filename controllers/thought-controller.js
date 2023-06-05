const { Thought, User } = require('../models');


const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to fetch thoughts', error: err });
      });
  },

  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to fetch thought', error: err });
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          thought.userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to create thought', error: err });
      });
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to update thought', error: err });
      });
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        return User.findByIdAndUpdate(
          thought.userId,
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
        res.status(500).json({ message: 'Failed to delete thought', error: err });
      });
  },

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
        res.status(500).json({ message: 'Failed to create reaction', error: err });
      });
  },

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
        res.status(500).json({ message: 'Failed to delete reaction', error: err });
      });
  },
};

module.exports = thoughtController;
