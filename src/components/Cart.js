import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Div, SideDrawer, Text, Row, Col, Anchor, Button } from "atomize";

const Cart = () => {
  const {
    isCartOpen,
    closeCart,
    checkout,
    removeItemsFromCheckout,
  } = useContext(ShopContext);

  const clearCart = () => {
    let itemsToClear = [];
    checkout.lineItems.forEach((item) => itemsToClear.push(item.id));
    removeItemsFromCheckout(itemsToClear);
  };

  return (
    <SideDrawer isOpen={isCartOpen} onClose={closeCart}>
      <Div d="flex" flexDir="column" m={{ b: "4rem" }}>
        {!checkout.lineItems && (
          <Div>
            <Text>Cart is loading.</Text>
          </Div>
        )}
        {checkout.lineItems && checkout.lineItems.length === 0 && (
          <Div>
            <Text>No items in cart.</Text>
          </Div>
        )}
        {checkout.lineItems &&
          checkout.lineItems.map((item) => {
            return (
              <Row key={item.id}>
                <Col>
                  <Div
                    bgImg={item.variant.image.src}
                    bgSize="cover"
                    bgPos="center center"
                    h="4rem"
                    w="5rem"
                  ></Div>
                </Col>
                <Col>
                  <Text>{item.title}</Text>
                  <Text>{item.variant.title}</Text>
                  <Text>{item.quantity}</Text>
                </Col>
                <Col>
                  <Text>€ {item.variant.price}</Text>
                  <Text>
                    €{" "}
                    {parseFloat(item.variant.price * item.quantity).toFixed(2)}
                  </Text>
                </Col>
                <Col>
                  <Button onClick={() => removeItemsFromCheckout([item.id])}>
                    Remove
                  </Button>
                </Col>
              </Row>
            );
          })}
        {checkout.lineItems && checkout.lineItems.length > 0 && (
          <Div>
            <Anchor href={checkout.webUrl} target="_blank">
              Checkout
            </Anchor>
            <Button onClick={clearCart}>Clear cart</Button>
          </Div>
        )}
      </Div>
    </SideDrawer>
  );
};

export default Cart;
