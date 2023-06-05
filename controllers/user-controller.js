const { User, Thought } = require('../models/User');


const userController = {
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
        res.status(500).json({ message: 'Failed to fetch users', error: err });
      });
  },

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
        res.status(500).json({ message: 'Failed to fetch user', error: err });
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to create user', error: err });
      });
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to update user', error: err });
      });
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        return Thought.deleteMany({ username: user.username });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Failed to delete user', error: err });
      });
  },

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
        res.status(500).json({ message: 'Failed to add friend', error: err });
      });
  },

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
        res.status(500).json({ message: 'Failed to remove friend', error: err });
      });
  },
};

module.exports = userController;
