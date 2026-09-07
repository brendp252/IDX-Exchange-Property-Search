const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async(req, res) => {
    try {
        const {
            city,
            zipcode,
            minPrice,
            maxPrice,
            beds,
            baths,
            sortBy,
            sortOrder,
            limit = "20",
            offset = "0"
        } = req.query;

        // Standard query parameter handling

        let sql = "SELECT * FROM rets_property WHERE 1 = 1";
        let countSql = "SELECT COUNT(*) AS total FROM rets_property WHERE 1 = 1";
        const params = [];
        
        if (city) {
            sql += " AND LOWER(TRIM(L_City)) = LOWER(TRIM(?))";
            countSql += " AND LOWER(TRIM(L_City)) = LOWER(TRIM(?))";
            params.push(city);
        }

        if (zipcode) {
            sql += " AND L_Zip = ?";
            countSql += " AND L_Zip = ?";
            params.push(zipcode);
        }

        if (minPrice) {
            const minPriceInt = Number(minPrice);
            if (!Number.isInteger(minPriceInt) || minPriceInt < 0) {
                return res.status(400).json({ error: "minPrice must be a nonnegative integer" });
            }
            sql += " AND L_SystemPrice >= ?";
            countSql += " AND L_SystemPrice >= ?";
            params.push(minPriceInt);
        }

        if (maxPrice) {
            const maxPriceInt = Number(maxPrice);
            if (!Number.isInteger(maxPriceInt) || maxPriceInt < 0) {
                return res.status(400).json({ error: "maxPrice must be a nonnegative integer" });
            }
            sql += " AND L_SystemPrice <= ?";
            countSql += " AND L_SystemPrice <= ?";
            params.push(maxPriceInt);
        }

        if (beds) {
            const bedsInt = Number(beds);
            if (!Number.isInteger(bedsInt) || bedsInt < 0) {
                return res.status(400).json({ error: "beds must be a nonnegative integer" });
            }
            sql += " AND L_Keyword2 = ?";
            countSql += " AND L_Keyword2 = ?";
            params.push(bedsInt);
        }

        if (baths) {
            const bathsInt = Number(baths);
            if (!Number.isInteger(bathsInt) || bathsInt < 0) {
                return res.status(400).json({ error: "baths must be a nonnegative integer" });
            }
            sql += " AND LM_Dec_3 = ?";
            countSql += " AND LM_Dec_3 = ?";
            params.push(bathsInt);
        }

        const [count] = await pool.query(countSql, params);

        // Sorting handling

        const sortWhitelist = [
            "L_SystemPrice",
            "ListingContractDate",
            "LM_Int2_3",
            "L_Keyword2"
        ];

        if (sortBy) {
            if (!sortWhitelist.includes(sortBy)) {
                return res.status(400).json({ error: "invalid sort parameter" });
            }
            sql += ` ORDER BY ${sortBy}`;
        }

        if (sortOrder) {
            if (sortOrder !== "ASC" && sortOrder !== "DESC") {
                return res.status(400).json({ error: "invalid sort order, use ASC or DESC" })
            }
            sql += ` ${sortOrder}`;
        }
        
        // Apply limit and offset

        const limitInt = Number(limit);
        if (!Number.isInteger(limitInt) || limitInt < 1 || limitInt > 100) {
            return res.status(400).json({ error: "limit must be an integer between 1 and 100, inclusive" });
        }
        sql += " LIMIT ?";
        params.push(limitInt);

        const offsetInt = Number(offset);
        if (!Number.isInteger(offsetInt) || offsetInt < 0) {
            return res.status(400).json({ error: "offset must be a nonnegative integer" });
        }
        sql += " OFFSET ?";
        params.push(offsetInt);

        const [rows] = await pool.query(sql, params);
        return res.json({ 
            total: count[0].total,
            limit: limitInt,
            offset: offsetInt,
            results: rows
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});

router.get("/:id/openhouses", async(req, res) => {
    try {
        const id = req.params.id;

        const idFormat = /^\d{9,10}$/;
        if (!idFormat.test(id)) {
            return res.status(400).json({ error: "IDs must be 9 or 10 digits" });
        }

        const sql = "SELECT all_data FROM rets_openhouse WHERE L_ListingID = ?";
        const params = [id];

        const [rows] = await pool.query(sql, params);
        if (rows.length === 0) {
            return res.status(404).json({ error: "ID not found" });
        }
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});

router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        
        const idFormat = /^\d{9,10}$/;
        if (!idFormat.test(id)) {
            return res.status(400).json({ error: "IDs must be 9 or 10 digits" });
        }

        const sql = "SELECT * FROM rets_property WHERE L_ListingID = ?";
        const params = [id];

        const [rows] = await pool.query(sql, params);
        if (rows.length === 0) {
            return res.status(404).json({ error: "ID not found" });
        }
        res.json(rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
