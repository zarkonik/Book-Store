import "../style.css";
import { Link } from "react-router-dom";
const Sidebar = ({ setGenre }) => {
  return (
    <div className="sidebar">
      <button
        className="sidebar-item"
        value="home"
        onClick={(e) => setGenre(e.target.value)}
      >
        Home
      </button>
      <button
        className="sidebar-item"
        value="drama"
        onClick={(e) => setGenre(e.target.value)}
      >
        Drama
      </button>
      <button
        className="sidebar-item"
        value="comedy"
        onClick={(e) => setGenre(e.target.value)}
      >
        Comedy
      </button>
      <button
        className="sidebar-item"
        value="thriller"
        onClick={(e) => setGenre(e.target.value)}
      >
        Thriller
      </button>
      <button
        className="sidebar-item"
        value="horror"
        onClick={(e) => setGenre(e.target.value)}
      >
        Horror
      </button>
    </div>
  );
};

export default Sidebar;
