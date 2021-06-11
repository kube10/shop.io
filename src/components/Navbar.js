import { useContext, useEffect } from "react";
import { Container, Anchor, Div } from "atomize";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const Navbar = () => {
  const { openCart, fetchAllCollections, collections } = useContext(
    ShopContext
  );

  useEffect(() => {
    fetchAllCollections();
    return () => {};
  }, [fetchAllCollections]);

  return (
    <Container d="flex" flexDir="row" p="2rem" justify="space-between">
      <Div textSize="display1" textWeight="700" textColor="">
        <Link to="/">Shop.io</Link>
      </Div>
      <Div d="flex" flexDir="row">
        {collections.map((collection) => {
          return (
            <Div key={collection.id} d="flex" align="center" m={{ l: "2rem" }}>
              <Link to={`/collection/${collection.id}`}>
                {collection.title}
              </Link>
            </Div>
          );
        })}
        <Div d="flex" align="center" m={{ l: "2rem" }}>
          <Anchor onClick={() => openCart()}>Cart</Anchor>
        </Div>
      </Div>
    </Container>
  );
};

export default Navbar;
