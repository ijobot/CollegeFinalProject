const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);
router.use(express.json());

router.post("/saveParty", async (req, res) => {
  const { combatants, currentUser } = req.body;
  try {
    await combatants.forEach((combatantToAdd) => {
      const addToParty = sql.query(
        `insert into ${currentUser.username}_SavedParty values ('${combatantToAdd.name}', '${combatantToAdd.type}', ${combatantToAdd.score})`
      );
      if (addToParty) {
        console.log(`Party member ${combatantToAdd.name} added!`);
      }
    });
    res.send(`${combatants.length} party members added to database.`);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username.substring(1);
  try {
    const data = await sql.query(`select * from ${username}_SavedParty`);
    if (data) {
      console.log(data);
      res.send(data.recordset);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
