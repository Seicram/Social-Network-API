const { User, Thought } = require('../models');

const userController = {
  // GET /api/users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        options: { sort: { createdAt: -1 } },
      })
      .populate('friends')
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET /api/users/:userId
  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate({
        path: 'thoughts',
        options: { sort: { createdAt: -1 } },
      })
      .populate('friends')
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

  // POST /api/users
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // PUT /api/users/:userId
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
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

  // DELETE /api/users/:userId
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        // Remove associated thoughts
        return Thought.deleteMany({ username: user.username });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST /api/users/:userId/friends/:friendId
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
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

  // DELETE /api/users/:userId/friends/:friendId
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
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
};

module.exports = userController;
