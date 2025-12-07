const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);
router.use(express.json());

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
  const { body } = req;
  const newcombatant = { ...body };
  try {
    const addToParty = await sql.query(
      `insert into Combatants values ('${newcombatant.name}', '${newcombatant.type}', ${newcombatant.score})`
    );
    if (addToParty) {
      console.log("Party member added!");
      res.send(`Party member ${newcombatant.name} added`);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
