import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
  }
`;

const ProductListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-top: 2rem;
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
  &.bounce {
    animation: bounce 0.6s ease-out;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
    70% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const [bouncingProductId, setBouncingProductId] = useState(null);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setBouncingProductId(product.id);
    setTimeout(() => setBouncingProductId(null), 600); 
  };

  return (
    <ProductListContainer>
      {products.length === 0 ? (
        <p>Loading Products...</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>R{product.price}</ProductPrice>
            <AddToCartButton
              className={bouncingProductId === product.id ? "bounce" : ""}
              onClick={() => handleAddToCart(product)}
            >
              {bouncingProductId === product.id ? "Added!" : "Add to Cart"}
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
    <Container>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ProductList products={filteredProducts} />
    </Container>
  );
};

export default App;
