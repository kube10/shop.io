import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CollectionPage from "./pages/CollectionPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShopProvider from "./context/shopContext";
import DiscountPage from "./pages/DiscountPage";

function App() {
  return (
    <ShopProvider>
      <Router>
        <Navbar />
        <Cart />
        <Switch>
          <Route path="/product/:id">
            <ProductPage />
          </Route>
          <Route path="/collection/:id">
            <CollectionPage />
          </Route>
          <Route path="/discounts">
            <DiscountPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </ShopProvider>
  );
}

export default App;
