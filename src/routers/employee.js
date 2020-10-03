const express = require('express');
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById
} = require('../controllers/employee');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.all('*', protect);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;
