import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api"; // Ensure this function is fetching from Fake Store API
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>R{product.price}</p>
          <img src={product.image} alt={product.title} width="100" />
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
