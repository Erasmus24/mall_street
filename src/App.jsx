import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  console.log("App component is rendering"); // Debugging

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
      </nav>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
