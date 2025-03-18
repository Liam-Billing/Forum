const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const discussionRoutes = require("./routes/discussions");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(express.static("public"));

// API route
app.use("/api/discussions", discussionRoutes);

app.get("/", (req, res) => {
  res.send("Backend är igång! Besök /api/discussions för att se diskussioner.");
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' data: blob:;"
  );
  next();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));