import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext();
//const [cart, setCart] = useState(getLocalStorage("cart"));
const getLocalStorage = (text) => {
  let item = localStorage.getItem(text);
  if (item) {
    return (item = JSON.parse(localStorage.getItem(text))); //parse from Json to object
  } else return [];
};

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(getLocalStorage("cart"));
  const [user, setUser] = useState(getLocalStorage("user"));

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart)); //iz objekta u json
    }
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ cart, setCart, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
