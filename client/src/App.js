import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import ShoppingCart from "./pages/ShoppingCart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.css";
import Navbar from "./pages/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
