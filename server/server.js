const express = require("express");
const connectDB = require("./config/db");
const port = 3000;

const app = express();

// connect to database
connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
