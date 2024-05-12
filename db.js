const mongoose = require('mongoose');

const dbUrl = "mongodb://localhost:27017/taskmasterDB";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(dbUrl)
        console.log("Database connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDb