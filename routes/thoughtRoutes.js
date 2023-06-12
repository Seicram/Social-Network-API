// routes/thoughtRoutes.js
const router = require('express').Router();
const thoughtController = require('../controllers/thoughtController');

// Thought routes
router.get('/', thoughtController.getAllThoughts);
router.get('/:id', thoughtController.getThoughtById);
router.post('/', thoughtController.createThought);
router.put('/:id', thoughtController.updateThought);
router.delete('/:id', thoughtController.deleteThought);

module.exports = router;
