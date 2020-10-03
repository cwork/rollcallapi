const express = require('express');
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById
} = require('../controllers/user');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.all('*', protect, authorize('admin'));

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;
