const express = require('express');
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById
} = require('../controllers/user');

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;
