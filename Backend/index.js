const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 9001;

// Cors Options
const corsOptions = {
  origin: 'http://localhost:4200'
}
app.use(cors(corsOptions));

// Env Variables
const dotenv = require("dotenv");
dotenv.config();

// Mongo
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to DB!");
});

// Routes
const authRoute = require("./routes/auth");
const boardRoute = require("./routes/messages");

// Middleware
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/board", boardRoute);

// Init
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
