import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
    picture: "",
    genre: "",
  });

  const { id: bookId } = useParams();

  const navigate = useNavigate();

  //const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    console.log(book);
    try {
      await axios.put("http://localhost:8800/book/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const readFileDataAsBase64 = (e) => {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUploadFile = (e) => {
    readFileDataAsBase64(e).then((data) => {
      setBook({ ...book, picture: data });
    });
  };

  useEffect(() => {
    const getBook = async () => {
      const { data } = await axios.get(
        `http://localhost:8800/book/book/${bookId}`
      );
      setBook(data);
    };
    getBook();
  }, [bookId]);

  if (book !== null) {
    return (
      <div className="form">
        <h1>Update Book</h1>
        <input
          type="text"
          value={book.title}
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          value={book.desc}
          placeholder="desc"
          onChange={handleChange}
          name="desc"
        />
        <input
          value={book.price}
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />
        <input
          value={book.genre}
          type="text"
          placeholder="genre"
          onChange={handleChange}
          name="genre"
        />
        <input
          type="file"
          onChange={(e) => handleUploadFile(e)}
          name="picture"
        />
        <button className="formButton" onClick={handleClick}>
          Update
        </button>
      </div>
    );
  }
};

export default Update;
