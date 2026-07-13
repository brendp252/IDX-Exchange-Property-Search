const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async(req, res) => {
    try {
        await pool.query("SELECT 1");
        console.log("Connected to database");
        res.status(200).json({ status: "ok", database: "connected" });
    }
    catch (error) {
        console.error("Failed to connect to database");
        res.status(500).json({ status: "error", database: "not connected" });
    }
});

module.exports = router;