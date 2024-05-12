const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.find);
router.get('/:id', projectController.findById);
router.post('/add', projectController.create);
router.delete('/delete/:id', projectController.deleteById);
router.put('/edit/:id', projectController.updateById);

module.exports = router;