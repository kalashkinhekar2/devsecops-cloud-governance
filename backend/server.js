const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const requestRoutes = require("./routes/requestRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", requestRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("Mongo Error:", err.message);
});

// Routes
app.get("/", (req, res) => {
    res.send("Cloud Governance Backend Running");
});

app.get("/check", (req, res) => {
    res.send("CHECK WORKING");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});