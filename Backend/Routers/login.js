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
      res.send({ message: "Login Router is working." });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/:username", async (req, res) => {
  const getUserData = await sql.query(
    `SELECT id, username FROM Users WHERE username = '${req.params.username.substring(
      1
    )}'`
  );
  res.send(getUserData.recordset[0]);
});

router.post("/login", async (req, res) => {
  // Deconstruct the request body
  let { username, password } = req.body;

  // Create outcome responses
  const emptyFields = {
    status: "FAILED",
    message: "Empty username or password!",
  };
  const incorrectPassword = {
    status: "FAILED",
    message: "Incorrect password!",
  };
  const userNotFound = {
    status: "FAILED",
    message: `No user with that username.`,
  };
  const credentialsPassed = {
    status: "SUCCESS",
    message: `You have logged into the system as ${username}!`,
  };

  try {
    if (username.trim() == "" || password.trim() == "") {
      // If either input is somehow left blank, send failure status
      res.json(emptyFields);
    } else {
      const userList = await sql.query("SELECT * FROM Users;");
      const usersArray = [];

      // Convert each record from an SQL IResult into a JavaScript Object to be able to work with data
      userList.recordset.forEach((record) => {
        usersArray.push(record);
      });
      console.log("usersArray", usersArray);

      // First, see if the username entered is in the database
      const nameFound = !!usersArray.find((item) => {
        return item.username === username;
      });
      console.log("nameFound", nameFound);
      if (nameFound) {
        // Next, see if the correct password was entered
        const passwordMatch = !!usersArray.find((item) => {
          return item.username === username && item.password === password;
        });
        console.log("passwordMatch", passwordMatch);

        if (passwordMatch) {
          // If username and password are in the database and match, send success status
          res.json(credentialsPassed);
        } else {
          // Otherwise send wrong password failure status
          res.json(incorrectPassword);
        }
      } else {
        // If username is not found, send failure status
        res.json(userNotFound);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  // Deconstruct the request body
  let { username, password } = req.body;

  // Create outcome responses
  const emptyFields = {
    status: "FAILED",
    message: "Empty username or password!",
  };
  const nameAlreadyExists = {
    status: "FAILED",
    message: `That username already exists!`,
  };
  const userProfileCreated = {
    status: "SUCCESS",
    message: `You have successfully created the ${username} profile!`,
  };

  try {
    if (username.trim() == "" || password.trim() == "") {
      // If either input is somehow left blank, send failure status
      res.json(emptyFields);
    } else {
      const userList = await sql.query("SELECT * FROM Users;");
      const usersArray = [];

      // Convert each record from an SQL IResult into a JavaScript Object to be able to work with data
      userList.recordset.forEach((record) => {
        usersArray.push(record);
      });
      console.log(usersArray);

      // First, see if the username entered is in the database
      const nameFound = !!usersArray.find((item) => {
        return item.username === username;
      });
      if (nameFound) {
        // If username exists, send failure status
        res.json(nameAlreadyExists);
      } else {
        // If username is not found, create the new profile using the given credentials
        await sql.query(
          `INSERT INTO Users VALUES ('${username}', '${password}')`
        );
        await sql.query(
          `CREATE TABLE ${username}_SavedParty (id int IDENTITY(1,1) PRIMARY KEY, name varchar(50), type varchar(50), score int, statBlockUrl varchar(100));`
        );
        res.json(userProfileCreated);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
