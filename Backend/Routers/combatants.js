const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");

router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config.config);
    if (pool) {
      console.log("database successfully connected");
    }
    res.send({ data: "Hey Joe, the Combatants Router is working." });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
