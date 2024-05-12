const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    userId: String,
    title: String,
    startDate: Number,
    isActive: Boolean
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;