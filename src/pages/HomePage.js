import { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { Container, Text, Div, Row, Col } from "atomize";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  if (!products) return <div>loading..</div>;
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
