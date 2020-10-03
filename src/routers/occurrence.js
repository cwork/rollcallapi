const express = require('express');
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById
} = require('../controllers/occurrence');

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:occurrenceId', getById);
router.put('/:occurrenceId', updateById);
router.delete('/:occurrenceId', deleteById);

module.exports = router;
