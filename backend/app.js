require('dotenv').config();
const express = require('express');
const app = express()
const port = 4000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
// const cors = require("cors");
mongoose.connect(mongoUrl)

// app.use(cors())
// require('./models/model')
// require('./models/post')
// app.use(express.json())
// app.use(require("./routes/auth"))
// app.use(require("./routes/createPost"))
// app.use(require("./routes/user"))
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})



// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // Get MongoDB URI
// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//     console.error("mongodb+srv:saziya34:ziya@123@cluster0.21m8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
//     process.exit(1); // Stop execution if no MongoDB URI
// }

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("✅ Connected to MongoDB");
// }).catch(err => {
//     console.error("❌ MongoDB connection error:", err);
// });
