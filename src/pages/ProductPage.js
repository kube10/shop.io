import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { Text, Div, Container, Row, Button, Col, Input } from "atomize";
import VariantButton from "../components/product/VariantButton";

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
          <Text textWeight="bold" textSize="display1">
            {product.title}
          </Text>
          <Text>{product.description}</Text>
          <Text textSize="display2">
            € <span id="price">{activeVariant.price}</span>
          </Text>

          <Div>
            {product.variants.length > 1 && (
              <Div>
                <Text>Select your size</Text>
                <Div>
                  {product.variants.map((variant) => (
                    <VariantButton
                      key={variant.id}
                      variant={variant}
                      activeVariant={activeVariant}
                      mouseEnter={() => {}}
                      mouseLeave={() => {}}
                      click={() => setVariantByIdAsActive(variant.id)}
                      product={product}
                    />
                  ))}
                </Div>
              </Div>
            )}
            <Div>
              {" "}
              <Text>Amount:</Text>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </Div>

            <Button
              onClick={() => {
                addItemToCheckout(activeVariant.id, amount);
                openCart();
              }}
            >
              Add to cart
            </Button>
          </Div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
