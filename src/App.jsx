import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import GlobalStyle from "./styles/GlobalStyle";

const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <nav style={{ backgroundColor: "#607d8b", padding: "1rem", textAlign: "center" }}>
          <Link to="/" style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}>Home</Link>
          <Link to="/cart" style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}>Cart</Link>
        </nav>
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
