import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import Button from "./Button";

export default function Container() {
  const { products } = useProducts();
  const { addItem, totalQuantity, cart, removeItem, decrementItem } = useCart();

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  let productCards;
  if (products.length > 0) {
    productCards = products.map((product) => (
      <div key={product.id}>
        <p>{product.name}</p>
        <Button onClick={() => addItem(product.id)}>Add</Button>
        <Button onClick={() => removeItem(product.id)}>Remove</Button>
        <Button onClick={() => decrementItem(product.id)}>Decrement</Button>
      </div>
    ));
  }

  return (
    <>
      <div>Cart Quantity: {totalQuantity}</div>
      <div>{productCards}</div>
    </>
  );
}
