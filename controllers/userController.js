const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken")

module.exports = {

    register: async (req, res) => {
        const { userName, password } = req.body;
        try {
            const userAvailable = await User.findOne({ userName });
            if (!userName || !password) {
                res.status(400).json({ message: "all fields are mandatory" });
            };
            if (userAvailable) {
                res.status(400).json({ message: "user already exists" });
            } else {
                const hashedPassword = await bcrypt.hash(password, 5);
                const newUser = await User.create({ userName, password: hashedPassword });
                console.log(newUser);
                res.json(newUser)
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    login: async (req, res) => {
        const { userName, password } = req.body;
        try {
            const user = await User.findOne({ userName });
            if (!user) {
                res.status(400).json({ "message": "Invalid username or password" });
            } else if (user && (await bcrypt.compare(password, user.password))) {
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        userName: user.userName,
                        password: user.password
                    },
                    "key",
                    { expiresIn: "1h" }
                );
                res.json({ accessToken, id: user._id, userName: user.userName, });
            } else {
                res.json({ message: "password not matched" })
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
}