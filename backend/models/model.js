const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
    },
    followers: [{ type: ObjectId, ref: "USER" }],
    following: [{ type: ObjectId, ref: "USER" }]
})

mongoose.model("USER", userSchema)






// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({

//     name: {
//         type: String,
//         required: [true, 'Name is required']
//     },
//     email: {
//         type: String,
//         required: [true, 'Emaill is required'],
//         unique: true
//     },
//     password: {
//         type: String,
//         required: [true,'Password is required']
//     },
//     phone: {
//         type: String,
//          required: [true,'Phone is Required']
//     },
//     picture: {
//         type: String
//     },
//     role: {type: String,
//          default: "student"
//         }
// }
// );

// module.exports = mongoose.model("User", userSchema);