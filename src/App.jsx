import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #cfd8dc;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #607d8b;
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  font-family: 'Caveat', cursive, 'Delicious Handrawn', cursive;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Footer = styled.footer`
  background-color: #455a64;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  margin-top: auto;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Container>
          <Navbar>
            <Title>MALL STREET</Title>
            <NavLinks>
              <StyledLink to="/">Home</StyledLink>
              <StyledLink to="/cart">Cart</StyledLink>
            </NavLinks>
          </Navbar>
          <MainContent>
            <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} /> 
              </Routes>
            </Suspense>
          </MainContent>
          <Footer>© {new Date().getFullYear()} Mall Street. All rights reserved.</Footer>
        </Container>
      </Router>
    </>
  );
}

export default App;
