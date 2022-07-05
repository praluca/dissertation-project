const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const port = 3000;
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// connect to database
connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use(cors());

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// define routes
app.use("/api/user", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/doctors", require("./routes/api/doctors"));
app.use("/api/consultations", require("./routes/api/consultations"));
app.use("/api/investigations", require("./routes/api/investigation"));
app.use("/api/vitalinformations", require("./routes/api/vitalinformations"));
app.use("/api/appointements", require("./routes/api/appointement"));
app.use("/api/products", require("./routes/api/products"));

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("connected");
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
