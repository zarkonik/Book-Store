import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("");
  const [currentBooks, setCurrentBooks] = useState([]);
  const [adminRole, setAdminRole] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const submenuRef = useRef(null);

  //const [currentUser, setCurrentUser] = useState(undefined);

  const { user, setUser, cart, setCart } = useGlobalContext();

  //ALTER TABLE test.books ADD COLUMN picture varchar(1024) NOT NULL default ""AFTER price
  const fetchAllBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8800/book/books");
      setBooks(data);
      setCurrentBooks(data);
      //console.log(currentBooks);
    } catch (err) {
      console.log(err);
    }
  };

  const getAdmin = async () => {
    const { user } = await axios.get(
      "http://localhost:8800/authentification/register"
    );
    setAdminRole(user);
    console.log(adminRole);//admin role
  };

  const logout = async () => {
    //debugger;
    await axios.put("http://localhost:8800/authentification/logout", {
      email: user.email,
    });
    window.location.assign("http://localhost:3000");
    //console.log(response);
  };

  useEffect(() => {
    const getLoggedUser = async () => {
      const { data } = await axios.get(
        "http://localhost:8800/authentification/login"
      );
      console.log(data);
      //setCurrentUser(data[0]);
    };
    getLoggedUser();
  }, []);

  console.log(user);

  useEffect(() => {
    getAdmin();
  }, []);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    if (genre !== "") {
      getBooksByGenre(genre);
    }
  }, [genre]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/book/books/${id}`);
      setCurrentBooks((prev) => prev.filter((book) => book.id !== id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    const searchWord = event.target.value;

    let filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchWord.toLowerCase())
    );
    setCurrentBooks(filteredBooks);
    //console.log(currentBooks);
  };

  const getBooksByGenre = (genre) => {
    if (genre.toLowerCase() === "home") {
      setCurrentBooks(books);
    } else {
      let filteredBooks = books.filter((book) => {
        return book.genre.toLowerCase() === genre.toLowerCase();
      });
      setCurrentBooks(filteredBooks);
    }
  };

  const handlePicCLick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const addToCart = (book) => {
    const foundBook = cart.find((cartItem) => book.id === cartItem.id);
    if (foundBook === undefined) {
      setCart((prevState) => {
        const { picture, ...rest } = book;
        //console.log(book);
        //console.log(rest);
        return [...prevState, rest];
      });
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="userImageContainer">
          <img
            src="slika cropovana.jpg"
            alt="Moja slika"
            onClick={handlePicCLick}
          />
        </div>
        (
        <div className="sub-menu-wrap" ref={submenuRef}>
          <div
            className={`sub-menu ${showUserDropdown ? "active" : "inactive"}`}
          >
            <a href="#" className="sub-menu-link">
              <p>Edit profile</p>
              <span>{">"}</span>
            </a>
            <a href="#" className="sub-menu-link">
              <p>Setting and privacy</p>
              <span>{">"}</span>
            </a>
            <a href="#" className="sub-menu-link">
              <p>Help & support</p>
              <span>{">"}</span>
            </a>
            <a href="#" className="sub-menu-link">
              <p>Logout</p>
              <span>{">"}</span>
            </a>
          </div>
        </div>
        )
      </nav>
      <div className="main-container">
        <Sidebar setGenre={setGenre} />

        <div className="main">
          <h1>LamaBook Shop</h1>
          <label>Search Bar</label>

          <input
            type="search"
            placeholder="Enter your search"
            name="searchValue"
            className="searchInput"
            onChange={(e) => handleSearch(e)}
          />

          <div className="books">
            {currentBooks.length !== 0 &&
              currentBooks.map((book) => {
                //const {id, picture, title, desc,price} = book;
                //console.log(currentUser);
                return (
                  <div className="book" key={book.id}>
                    {book.picture && <img src={book.picture} alt="slika" />}
                    <div className="book-details">
                      <h2>{book.title}</h2>
                      <p>{book.desc}</p>
                      <span>{book.price}</span>
                      <p>{book.genre}</p>
                      {user.role === "admin" && (
                        <button
                          className="delete"
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      )}
                      {user.role === "admin" && (
                        <button className="update">
                          <Link to={`/update/${book.id}`}>Update</Link>
                        </button>
                      )}
                      <button onClick={() => addToCart(book)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <button>
            <Link to="/add">Add new Book</Link>
          </button>

          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Books;
