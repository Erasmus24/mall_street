import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  margin-bottom: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  color: #555;
`;

const ProductPrice = styled.p`
  color: #777;
  margin: 0.5rem 0;
`;

const AddToCartButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading products...</p>;
  if (isError) return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <Container>
      <Title>Mall Street</Title>
      <ProductGrid>
        {products?.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>R{product.price}</ProductPrice>
            <AddToCartButton onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default ProductList;
