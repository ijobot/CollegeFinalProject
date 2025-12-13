const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");
const logger = require("../logger");

router.use(logger);

// As soon as the user lands on the login/signup page, a connection to the database is established.
// They are not connected to a profile yet, but the front-end, back-end, and DB are all now communicating.
router.get("/", async (req, res) => {
  try {
    const connection = await sql.connect(config);
    if (connection) {
      console.log("database successfully connected");
      res.send({ message: "Login success!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// Helper function to access the current user's profile when needed.  Password is never revealed on the front-end.
router.get("/:username", async (req, res) => {
  try {
    const getUserData = await sql.query(
      `SELECT id, username FROM Users WHERE username = '${req.params.username.substring(
        1
      )}'`
    );
    // Recordset always returns an array, but we only ever need 1 user at a time.
    res.send(getUserData.recordset[0]);
  } catch (err) {
    console.log(err);
  }
});

// Handling login, checking if profile exists, checking empty inputs, checking password.
router.post("/login", async (req, res) => {
  // Deconstruct the request body
  let { username, password } = req.body;

  // Create outcome responses
  const emptyFields = {
    status: "failed",
    message: "Empty username or password!",
  };
  const incorrectPassword = {
    status: "failed",
    message: "Incorrect password!",
  };
  const userNotFound = {
    status: "failed",
    message: `No user with that username!`,
  };
  const credentialsPassed = {
    status: "success",
    message: `You have successfully logged in as ${username}!`,
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

// Handling signup, same as login but with added functionality of creating the user profile and user_SavedParty tables.
router.post("/signup", async (req, res) => {
  // Deconstruct the request body
  let { username, password } = req.body;

  // Create outcome responses
  const emptyFields = {
    status: "failed",
    message: "Empty username or password!",
  };
  const nameAlreadyExists = {
    status: "failed",
    message: `That username already exists!`,
  };
  const userProfileCreated = {
    status: "success",
    message: `${username} profile successfully created!`,
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
