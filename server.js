const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// 🔥 Create server (IMPORTANT for socket)
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// 🔥 FIX: io pass karo
const leadRoutes = require("./routes/leadRoutes")(io);
app.use("/api/leads", leadRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected");
});

// 🔥 IMPORTANT: app.listen nahi, server.listen use karo
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("🚀 Server running");
});


// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Static files
// app.use(express.static(path.join(__dirname, "public")));

// // Root route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // MongoDB connect
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => console.log("❌ DB Error:", err));

// // 🔥 Lead Schema
// const leadSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   type: String,
//   category: String,
//   details: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Lead = mongoose.model("Lead", leadSchema);

// // 🔥 POST route (save lead)
// app.post("/api/leads", async (req, res) => {
//   try {
//     const lead = new Lead(req.body);
//     await lead.save();
//     res.status(201).json({ message: "Lead saved" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🔥 GET route (fetch leads)  ✅ THIS FIXES YOUR ERROR
// app.get("/api/leads", async (req, res) => {
//   try {
//     const leads = await Lead.find().sort({ createdAt: -1 });
//     res.json(leads);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });