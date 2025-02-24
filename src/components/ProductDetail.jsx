import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <ProductDetailContainer>
      <ProductImage src={product.image} alt={product.title} />
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>R{product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
