require("dotenv").config();

const express = require("express");
const app = express();
const pool = require("./db");

app.get("/api/health", async(req, res) => {
    try {
        await pool.query("SELECT 1");
        res.status(200).json({ status: "ok", database: "connected" });
    }
    catch (error) {
        console.error("Failed to connect to database");
        res.status(500).json({ status: "error", database: "not connected" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
