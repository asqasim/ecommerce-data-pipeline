import { CartContextProvider } from "./context/CartContext";
import Button from "./components/ui/Button";

export default function App() {
  return (
    <CartContextProvider>
      <Button />
    </CartContextProvider>
  );
}
