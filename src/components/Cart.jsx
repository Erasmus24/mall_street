import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cartSlice";
import styled from "styled-components";

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CartTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const CartGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-bottom: 2rem;
`;

const CartCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  height: 100%; 
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CartImage = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  margin-bottom: 1rem;
`;

const CartTitleText = styled.h3`
  font-size: 1.2rem;
  color: #555;
  margin: 0.5rem 0;
`;

const CartPrice = styled.p`
  color: #777;
  margin: 0.5rem 0;
`;

const QuantityControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const QuantityButton = styled.button`
  background-color: #455a64;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #607d8b;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const Total = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  color: #333;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <CartGrid>
          {cart.map((item) => (
            <CartCard key={item.id}>
              <CartImage src={item.image} alt={item.title} />
              <CartTitleText>{item.title}</CartTitleText>
              <CartPrice>R{(item.price * item.quantity).toFixed(2)}</CartPrice>
              <QuantityControls>
                <QuantityButton onClick={() => dispatch(decreaseQuantity(item.id))}>-</QuantityButton>
                <span>{item.quantity}</span>
                <QuantityButton onClick={() => dispatch(increaseQuantity(item.id))}>+</QuantityButton>
              </QuantityControls>
              <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </RemoveButton>
            </CartCard>
          ))}
        </CartGrid>
      )}
      <Total>
        Total: R{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </Total>
    </CartContainer>
  );
};

export default Cart;
