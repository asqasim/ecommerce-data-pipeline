import { useCart } from "../../context/CartContext";

export default function Product(props) {
  const { addItem, totalQuantity } = useCart();
  const { name, id, key } = props;

  return (
    <div
      key={key}
      style={{
        width: "100%",
        position: "relative",
        border: "2px solid green",
        height: "200px",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
      }}>
      <div style={{ position: "absolute", right: "0", top: "0" }}>
        <h1>{totalQuantity}</h1>
      </div>
      <h2>{name}</h2>
      <button
        onClick={() => {
          addItem(id);
        }}>
        Add To Cart
      </button>
    </div>
  );
}
