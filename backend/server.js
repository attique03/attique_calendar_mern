const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const { checkUser } = require("./middleware/authMiddleware");
const dotenv = require("dotenv");
const connectMongoDB = require("./config/connectDatabase.js");

dotenv.config();
connectMongoDB();

// express app
const app = express();
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/users",userRoutes);

// middleware & static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.listen(process.env.PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold));


