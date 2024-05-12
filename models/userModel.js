const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
});

const User = mongoose.model("User", userSchema)
module.exports = User