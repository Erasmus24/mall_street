import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>R{item.price}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: R{cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
