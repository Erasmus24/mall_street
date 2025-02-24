import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductList from "./ProductList";
import { addToCart } from "../features/cartSlice";

const mockStore = configureStore([]);

const mockProducts = [
  { id: 1, title: "Product A", price: 100, image: "imgA.jpg" },
  { id: 2, title: "Product B", price: 200, image: "imgB.jpg" },
];

describe("ProductList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ cart: [] });
    store.dispatch = jest.fn();
  });

  it("renders product list correctly", () => {
    render(
      <Provider store={store}>
        <ProductList products={mockProducts} />
      </Provider>
    );

    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("R100")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  it("adds product to cart when Add to Cart button is clicked", () => {
    render(
      <Provider store={store}>
        <ProductList products={mockProducts} />
      </Provider>
    );

    const addButton = screen.getAllByText("Add to Cart")[0];
    fireEvent.click(addButton);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(mockProducts[0]));
  });
});
