import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import styled from "styled-components";

const CartContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const RemoveButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background: #cc0000;
  }
`;

const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  margin-top: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <CartItem key={item.id}>
            <div>
              <h4>{item.title}</h4>
              <p>R{item.price.toFixed(2)}</p>
            </div>
            <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </RemoveButton>
          </CartItem>
        ))
      )}
      <TotalPrice>Total: R{totalPrice.toFixed(2)}</TotalPrice>
    </CartContainer>
  );
};

export default Cart;
