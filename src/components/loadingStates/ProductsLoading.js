import { Div, Col, Row, Container } from "atomize";

const ProductsLoading = () => {
  const amount = 10;

  let items = [];

  for (let i = 0; i < amount; i++) {
    items.push(
      <Col size="3" key={i}>
        <Div rounded="lg" h="20rem" bg="gray300"></Div>
        <Div rounded="lg" h="5rem" m={{ y: "0.5rem" }} bg="gray300"></Div>
      </Col>
    );
  }
  return (
    <Container>
      <Row>{items}</Row>
    </Container>
  );
};

export default ProductsLoading;
