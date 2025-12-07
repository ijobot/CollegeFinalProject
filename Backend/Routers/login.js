const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");
const logger = require("../logger");

router.use(logger);

router.get("/", async (req, res) => {
  try {
    const connection = await sql.connect(config);
    if (connection) {
      console.log("database successfully connected");
      res.send({ message: "Hey Joe, the Login Router is working." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  const userNotFound = {
    status: "FAILED",
    message: "Empty username or password!",
  };
  const usernameAlreadyExists = {
    status: "FAILED",
    message: "That username already exists!",
  };
  const newUserCreated = {
    status: "SUCCESS",
    message: "Your username and password have been added!",
  };

  if (username.trim() == "" || password.trim() == "") {
    res.json(userNotFound);
  } else {
    const usernameList = await sql.query("select username from Users");
    const alreadyExists = usernameList.recordset.some((user) => {
      user.username === username;
    });

    if (alreadyExists) {
      res.json(usernameAlreadyExists);
    } else {
      const createNewUser = await sql.query(
        `insert into Users VALUES ('${username}', '${password}');`
      );
      res.json(newUserCreated);
    }
  }
  res.send("Finished");
});

module.exports = router;
