import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { Text, Div, Container, Row, Button, Col, Input } from "atomize";

const ProductPage = () => {
  const { id } = useParams();
  const {
    fetchProductById,
    addItemToCheckout,
    product,
    activeVariant,
    openCart,
    setVariantByIdAsActive,
  } = useContext(ShopContext);

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  const [amount, setAmount] = useState(1);

  if (product.id !== id) return <div>Loading...</div>;

  return (
    <Container>
      <Row>
        <Col>
          <Div
            bgImg={product.images[0].src}
            bgSize="cover"
            bgPos="center center"
            h="40rem"
          ></Div>
        </Col>
        <Col>
          <Text>{product.title}</Text>
          <Text>
            € <span id="price">{activeVariant.price}</span>
          </Text>
          {product.variants.length > 1 && (
            <Div>
              <label>Select your size</label>
              <select
                value={activeVariant.id}
                onChange={(e) => setVariantByIdAsActive(e.target.value)}
              >
                {product.variants.map((variant) => {
                  return (
                    <option key={variant.id} value={variant.id}>
                      {variant.title}
                    </option>
                  );
                })}
              </select>
            </Div>
          )}
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <Button
            onClick={() => {
              addItemToCheckout(activeVariant.id, amount);
              openCart();
            }}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
