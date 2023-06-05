// Initialize express router
const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

//Get a single thought by its _id
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // POST to create a reaction stored in a single thought's reactions array field
router.route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
