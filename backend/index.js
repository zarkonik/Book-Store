const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
//app.use(express.json()); //ovo mora da bi radilo slanje jsona preko body
app.use(cors());

const authentificationRouter = require("./routes/authentification");
const bookRouter = require("./routes/book");

app.use("/authentification", authentificationRouter);
app.use("/book", bookRouter);

app.get("/", (req, res) => {
  res.json("Hello this is backend");
});
//ALTER TABLE test.books ADD COLUMN picture longtext NOT NULL AFTER price;
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zarko123';

app.listen(8800, () => {
  console.log("Connected to backend!!!");
});
