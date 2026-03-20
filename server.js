const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Create server
const server = http.createServer(app);

// Socket setup
const io = new Server(server);

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/brokerDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const leadRoutes = require("./routes/leadRoutes")(io);
app.use("/api/leads", leadRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected");
});

// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// const twilio = require("twilio");

// const client = new twilio("ACCOUNT_SID", "AUTH_TOKEN");


// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connect
// mongoose.connect("mongodb://127.0.0.1:27017/brokerDB")
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Routes
// const leadRoutes = require("./routes/leadRoutes");
// app.use("/api/leads", leadRoutes);

// // Serve frontend
// app.use(express.static(path.join(__dirname, "public")));

// // Simple login route
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === "admin" && password === "1234") {
//     res.json({ success: true });
//   } else {
//     res.json({ success: false });
//   }
// });

// // Start server
// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });