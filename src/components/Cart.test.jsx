import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cartSlice";

const mockStore = configureStore([]);

const mockCartItems = [
  { id: 1, title: "Product A", price: 100, quantity: 2, image: "imgA.jpg" },
];

describe("Cart Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ cart: { items: mockCartItems } }); // Ensure correct state structure
    store.dispatch = jest.fn();
  });

  it("displays cart items correctly", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("R200.00")).toBeInTheDocument(); // 100 * 2
  });

  it("removes item from cart when Remove button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(removeFromCart({ id: 1 }));
  });

  it("increases quantity when '+' button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const increaseButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(increaseButton);

    expect(store.dispatch).toHaveBeenCalledWith(increaseQuantity({ id: 1 }));
  });

  it("decreases quantity when '-' button is clicked", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const decreaseButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(decreaseButton);

    expect(store.dispatch).toHaveBeenCalledWith(decreaseQuantity({ id: 1 }));
  });
});
