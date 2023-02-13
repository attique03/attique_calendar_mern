const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/connectDatabase.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const { authUser } = require("./middleware/authMiddleware");

dotenv.config();
connectMongoDB();

// express app
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/users", userRoutes);

app.use(authUser);

app.use("/api/events", eventRoutes);

// middleware & static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.listen(
  process.env.PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);
