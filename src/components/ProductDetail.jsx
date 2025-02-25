import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import styled from "styled-components";

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 5px;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  color: #01579b;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: #555;
  font-size: 1rem;
  text-align: center;
  max-width: 600px;
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #218838;
  }

  &.bounce {
    animation: bounce 0.6s ease-out;
  }

  @keyframes bounce {
    0% { transform: scale(1); }
    30% { transform: scale(1.1); }
    50% { transform: scale(1); }
    70% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setBouncing(true);
      setTimeout(() => setBouncing(false), 600);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <ProductDetailContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>R{product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
      <AddToCartButton className={bouncing ? "bounce" : ""} onClick={handleAddToCart}>
        {bouncing ? "Added!" : "Add to Cart"}
      </AddToCartButton>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
