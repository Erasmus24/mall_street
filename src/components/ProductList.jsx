import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice"; 
import styled from "styled-components";

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

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bouncingProductId, setBouncingProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setBouncingProductId(product.id);
    setTimeout(() => setBouncingProductId(null), 600); 
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ProductListContainer>
      {products.map((product) => (
        <ProductCard key={product.id} onClick={() => handleProductClick(product.id)}>
          <ProductImage src={product.image} alt={product.title} />
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>R{product.price}</ProductPrice>
          <AddToCartButton
            className={bouncingProductId === product.id ? "bounce" : ""}
            onClick={(e) => {
              e.stopPropagation(); 
              handleAddToCart(product);
            }}
          >
            {bouncingProductId === product.id ? "Added!" : "Add to Cart"}
          </AddToCartButton>
        </ProductCard>
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
