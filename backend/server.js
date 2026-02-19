const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.use(cors());
app.use(express.json());
app.use("/api/admin",require("./routes/admin"));
app.use("/api/coach",
require("./routes/coach"));


app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Fitness Platform API Healthy"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
