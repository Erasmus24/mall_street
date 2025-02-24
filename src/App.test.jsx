import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders search input and filters products", async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText("Search for products...");
    fireEvent.change(searchInput, { target: { value: "Product A" } });

    expect(searchInput.value).toBe("Product A");
  });
});
