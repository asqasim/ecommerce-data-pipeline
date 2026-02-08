import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Container from "./components/ui/Container";

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Container />
      </CartProvider>
    </ProductProvider>
  );
}
