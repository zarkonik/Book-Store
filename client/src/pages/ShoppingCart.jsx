import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const ShoppingCart = () => {
  const { cart } = useGlobalContext();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="cartContainer">
      {cart.map((knjiga) => {
        return (
          <div className="cartItem">
            <img src={knjiga.picture} alt="slika" />
            <p>{knjiga.title}</p>;
          </div>
        );
      })}
      ;
    </div>
  );
};

export default ShoppingCart;
