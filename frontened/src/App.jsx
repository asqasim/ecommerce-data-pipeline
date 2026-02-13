import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Store from "./pages/Store";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Store />} />
          {/* You can add more routes here if needed */}
        </Routes>
      </CartProvider>
    </ProductProvider>
  );
}
