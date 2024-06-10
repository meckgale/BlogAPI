const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

require("dotenv").config();

// Load models
require("./models/User");
require("./models/Post");
require("./models/Comment");

// Passport configuration
require("./config/passport")(passport); // Configure passport

const app = express();
app.use(passport.initialize()); // Initialize passport

const PORT = process.env.PORT || 5000;

// Routes
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.static("public"));

// Use routes
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
