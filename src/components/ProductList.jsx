import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import styled from "styled-components";

const ProductListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 100%;
  position: relative;
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
  flex-grow: 1; 
`;

const ProductPrice = styled.p`
  color: #777;
  margin: 0.5rem 0;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto; 
  
  &:hover {
    background-color: #218838;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.8rem;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <ProductListContainer>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>R{product.price}</ProductPrice>
            <AddToCartButton onClick={() => handleAddToCart(product)}>
              Add to Cart
            </AddToCartButton>
          </ProductCard>
        ))
      )}
    </ProductListContainer>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
