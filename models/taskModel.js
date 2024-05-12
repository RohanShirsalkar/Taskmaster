const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId: String,
    projectId: String,
    task: String,
    endDate: String,
    priority: String,
    isCompleted: Boolean,
    timestamp: Number
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;