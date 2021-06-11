import { Container, Text, Div, Row, Col } from "atomize";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Col size="3">
      <Link to={`/product/${product.id}`}>
        <Div p="2rem">
          <Div
            bgImg={product.images[0].src}
            bgSize="cover"
            bgPos="center center"
            h="20rem"
          />
          <Text>{product.title}</Text>
          <Text>{product.variants[0].price}</Text>
        </Div>
      </Link>
    </Col>
  );
};

export default ProductCard;
