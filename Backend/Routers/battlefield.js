const express = require("express");
const router = express.Router();
const sql = require("mssql");
const logger = require("../logger");

router.use(logger);
router.use(express.json());

router.post("/saveParty", async (req, res) => {
  const { combatants, currentUser } = req.body;
  try {
    const data = await sql.query(
      `select * from ${currentUser.username}_SavedParty`
    );
    if (data.recordset.length) {
      await sql.query(`DROP TABLE ${currentUser.username}_SavedParty`);
      await sql.query(
        `CREATE TABLE ${currentUser.username}_SavedParty (id int IDENTITY(1,1) PRIMARY KEY, name varchar(50), type varchar(50), score int);`
      );
      await combatants.forEach((combatantToAdd) => {
        const addToParty = sql.query(
          `insert into ${currentUser.username}_SavedParty values ('${combatantToAdd.name}', '${combatantToAdd.type}', ${combatantToAdd.score})`
        );
        if (addToParty) {
          console.log(`${combatantToAdd.name} added to saved party!`);
        }
      });
    } else {
      await combatants.forEach((combatantToAdd) => {
        const addToParty = sql.query(
          `insert into ${currentUser.username}_SavedParty values ('${combatantToAdd.name}', '${combatantToAdd.type}', ${combatantToAdd.score})`
        );
        if (addToParty) {
          console.log(`${combatantToAdd.name} added to saved party!`);
        }
      });
    }
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
