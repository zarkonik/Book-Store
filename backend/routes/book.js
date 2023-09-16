const router = require("express").Router();
const db = require("../db");

router.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/book/:id", (req, res) => {
  //console.log(req.params.id);
  const bookId = req.params.id;
  const q = `SELECT * FROM books WHERE id = ${bookId}`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

router.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `desc`, `price`, `cover`, `picture`, `genre`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    req.body.picture,
    req.body.genre,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created!!");
  });
});

router.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted!!");
  });
});

router.put("/books", (req, res) => {
  const bookId = req.body.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ?, `picture` = ? WHERE id = ? ";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    req.body.picture,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated!!");
  });
});

module.exports = router;
