const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, "key");
            // console.log(req);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).json("user not authorized 2");
        }
    }
}

module.exports = validateToken;