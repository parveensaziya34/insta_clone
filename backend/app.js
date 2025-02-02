// require('dotenv').config(); // Load environment variables
// const express = require('express');

// const mongoose = require('mongoose');
// const app = express();
// const cors = require("cors");

// app.use(cors());
// require('./models/model')
// require('./models/post')
// app.use(express.json())
// app.use(require("./routes/auth"))
// app.use(require("./routes/createPost"))
// app.use(require("./routes/user")) 


// // Get MongoDB URI
// const MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);

// if (!MONGO_URI) {
//     console.error("error in connection");
//     process.exit(1); // Stop execution if no MongoDB URI
// }

// // Connect to MongoDB
// mongoose.connect(MONGO_URI
//     // useNewUrlParser: true,
//     // useUnifiedTopology: tru
// ).then(() => console.log("MongoDB connected successfully"))
// .catch(err => console.error("MongoDB connection error:", err));
// console.log(MONGO_URI)
// require('dotenv').config(); // Load environment variables at the very top
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require("cors");


// const app = express();

// // Enable CORS for all origins (you can change this to limit to specific origins)
// app.use(cors({
//     origin: '*',  // Allow all origins during development
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Debugging: Check if MONGO_URI is loaded correctly
// console.log("MONGO_URI:", process.env.MONGO_URI);

// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//     console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file.");
//     process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(MONGO_URI)
//     .then(() => console.log("✅ MongoDB connected successfully"))
//     .catch(err => console.error("❌ MongoDB connection error:", err));

// // Import models and routes AFTER MongoDB connection
// require('./models/model');
// require('./models/post');
// app.use(require("./routes/auth"));
// app.use(require("./routes/createPost"));
// app.use(require("./routes/user"));

// app.listen(5000, () => console.log("Server running on port 5000"));



require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

// Enable CORS for all origins (you can change this to limit to specific origins)
app.use(cors({
    origin: '*',  // Allow all origins during development
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Debugging: Check if MONGO_URI is loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Import models and routes AFTER MongoDB connection
require('./models/model');
require('./models/post');
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));

app.listen(5000, () => console.log("Server running on port 5000"));
