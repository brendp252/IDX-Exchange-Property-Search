const express = require("express");
const app = express();
const pool = require("./db");

app.get("/api/health", async(req, res) => {
    try {
        await pool.getConnection();
        await pool.query("SELECT 1");
        res.status(200).json({ status: "ok", database: "connected" });
    }
    catch (err) {
        res.status(500).json({ status: "error" });
    }
});