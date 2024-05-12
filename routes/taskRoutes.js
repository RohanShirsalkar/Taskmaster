const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController")

router.get('/:projectId', taskController.find);
router.post('/add', taskController.create);
router.put('/edit/:id', taskController.updateByid);
router.delete('/delete/:id', taskController.deleteById);

module.exports = router;