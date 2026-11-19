
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Backend test
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working!"
  });
});

// Contact form API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please complete all fields."
    });
  }

  console.log("New message:", { name, email, message });

  res.json({
    success: true,
    message: "Your message was received!"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
