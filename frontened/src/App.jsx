import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Store from "./pages/Store";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Store/>
      </CartProvider>
    </ProductProvider>
  );
}
