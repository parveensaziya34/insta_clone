// const jwt = require("jsonwebtoken")
// const { Jwt_secret } = require("../keys")
// const mongoose = require("mongoose")
// const USER = mongoose.model("USER")

// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//         return res.status(401).json({ error: "You must have logged in 1" })
//     }
//     const token = authorization.replace("Bearer ", "")
//     jwt.verify(token, Jwt_secret, (err, payload) => {
//         if (err) {
//             return res.status(401).json({ error: "You must have logged in 2" })
//         }
//         const { _id } = payload
//         USER.findById(_id).then(userData => {
//             req.user = userData
//             next()
//         })
//     })

// }



const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = auth;