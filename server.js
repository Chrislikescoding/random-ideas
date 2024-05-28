const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
const app = express();
// static folder
app.use(express.static(path.join(__dirname, "public")));
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the random ideas API" });
});
const ideaRouter = require("./routes/ideas");
app.use("/api/ideas", ideaRouter);
app.listen(port, () => console.log(`server listening on port ${port}`));
