const router = require("express").Router();
const db = require("../db");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.put("/login", (req, res) => {
  const email = req.body.logEmail;
  const password = req.body.logPassword;

  const q = "select * from users where email = ? and password = ?";
  db.query(q, [email, password], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.get("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE loggedIn = 1";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.put("/logout", (req, res) => {
  const email = req.body.email;

  const q = "UPDATE users SET `loggedIn` = ? WHERE email = ?";

  db.query(q, [0, email], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has logged out!");
  });
});

router.get("/logout", (req, res) => {
  const q = "SELECT * FROM users WHERE loggedIn = 1";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/register", (req, res) => {
  const q = "SELECT * FROM users WHERE role = 'admin'";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ?;", //pazi nemo da zaboravis da koristis email
    email,
    (err, result) => {
      //result je rezultat query-a
      console.log(email);
      if (err) {
        res.send(err);
      } else {
        if (result.length > 0) {
          //console.log(result.length);
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (error) {
              res.status(500).send({ error: "Internal server error" });
            } else {
              if (response) {
                console.log(result);
                db.query(
                  "UPDATE users SET loggedIn = 1 WHERE email=?;",
                  email,
                  (err, result) => {
                    if (err) {
                      throw err;
                    }
                  }
                );
                res.status(200).send(result);
              } else {
                res.status(401).send("Wrong username/password!!!");
              }
            }
          });
        } else {
          res.status(404).send("User does not exist");
        }
      } /*else {
        if (response.status === 404) {
          res.status(404).send("User doesn't exist");
        }
      }*/
    }
  );
});

router.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.userRole;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);

  const q =
    "INSERT  INTO users (email, password, role, loggedIn) VALUES (?,?,?,?)";

  db.query(q, [email, hashedPassword, role, 0], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been created!!");
  });
});

/*const q = "INSERT INTO users (email, password) VALUES (?,?)";

  db.query(q, [email, password], (err, data) => {
    if (err) return res.json(err);
    return res.json("User has been created!!");
  });*/

module.exports = router;
