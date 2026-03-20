const express = require("express");
const Lead = require("../models/Lead");

module.exports = (io) => {
  const router = express.Router();

  // Add lead
  router.post("/add", async (req, res) => {
    try {
      const lead = new Lead(req.body);
      await lead.save();

      // 🔥 Emit event
      io.emit("newLead", lead);

      res.json({ message: "Lead saved + emitted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get leads
  router.get("/", async (req, res) => {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  });

  return router;
};


// const express = require("express");
// const router = express.Router();
// const Lead = require("../models/Lead");

// // Add lead
// router.post("/add", async (req, res) => {
//   try {
//     const lead = new Lead(req.body);
//     await lead.save();
//     res.json({ message: "Lead saved" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all leads
// router.get("/", async (req, res) => {
//   const leads = await Lead.find().sort({ createdAt: -1 });
//   res.json(leads);
// });

// router.post("/add", async (req, res) => {
//   try {
//     const lead = new Lead(req.body);
//     await lead.save();

//     // 📲 WhatsApp message
//     await client.messages.create({
//       body: `New Lead 🚀\nName: ${lead.name}\nPhone: ${lead.phone}\nCategory: ${lead.category}`,
//       from: "whatsapp:+14155238886",
//       to: "whatsapp:+916361840554"
//     });

//     res.json({ message: "Lead saved + WhatsApp sent" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;