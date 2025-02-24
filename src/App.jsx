import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));

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

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar>
          <Title>MALL STREET</Title>
          <NavLinks>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/cart">Cart</StyledLink>
          </NavLinks>
        </Navbar>
        <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
