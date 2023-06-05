// Initialize express router and create routes
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

//GET all users and POST a new user
router.route('/')
  .get(getAllUsers)
  .post(createUser);

  //GET one user, PUT to update user by id, and DELETE to remove user by id
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  //POST to add a new friend to a user's friend list and DELETE to remove a friend from a user's friend list
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
