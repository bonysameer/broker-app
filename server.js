const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// 🔥 Static files serve (public folder)
app.use(express.static(path.join(__dirname, "public")));

// 🔥 ROOT ROUTE (IMPORTANT FIX)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 TEST ROUTE (check server working)
app.get("/test", (req, res) => {
  res.send("Server is working 🚀");
});

// 🔥 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ DB Error:", err));

// 🔥 Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");

// const PORT = process.env.PORT || 5000;

// const app = express();

// // Create server
// const server = http.createServer(app);

// // Socket setup
// const io = new Server(server);

// app.use(cors());
// app.use(express.json());

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // MongoDB connect
// // mongoose.connect("mongodb://127.0.0.1:27017/brokerDB")
//  mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Routes
// const leadRoutes = require("./routes/leadRoutes")(io);
// app.use("/api/leads", leadRoutes);

// // Serve frontend
// app.use(express.static(path.join(__dirname, "public")));

// // Socket connection
// io.on("connection", (socket) => {
//   console.log("User connected");
// });

// // Start server
// server.listen(PORT, () => {
//   console.log("Server running");
// });

































