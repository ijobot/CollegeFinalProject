const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);

router.get("/", async (req, res) => {
  try {
    const data = await sql.query("select * from Combatants");
    if (data) {
      console.log(data);
      res.send(data.recordset);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const addToParty = await sql.query(
    "insert into Combatants values ('Kilian', 'Player', 7)"
  );
  if (addToParty) {
    console.log("Party member added!");
    res.send("Party member added");
  }
});

module.exports = router;
