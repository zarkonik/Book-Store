import React from "react";
import "../style.css";
import { BsCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  //const handleCLick = () => alert("Ikonica kliknuta..");

  return (
    <div className="navbarContainer">
      <span>Navbar</span>

      <Link to={"/shoppingCart"}>
        <BsCartCheckFill
          className="cartIcon"
          //onClick={() => alert("CLicked me.")}
        />
      </Link>
    </div>
  );
};

export default Navbar;
