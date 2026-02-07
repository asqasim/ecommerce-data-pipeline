// File extension must be .jsx
import { useCart } from "../../context/CartContext";

export default function Button() {
    
  const { addItem , cart,resetCart,updateQuantity} = useCart();
  console.log(cart)

  return (
    <>
        <button onClick={() => {addItem(1)}}>Add</button>
        <button onClick={() => {updateQuantity(1,12)}}>Update</button>
        <button onClick={() => {resetCart()}}>Reset</button>
    </>
);
}
