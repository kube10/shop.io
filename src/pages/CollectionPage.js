import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { useEffect, useContext } from "react";
import { Container, Row, Text } from "atomize";
import ProductCard from "../components/ProductCard";

const CollectionPage = () => {
  const { id } = useParams();
  const { fetchCollectionById, collection } = useContext(ShopContext);

  useEffect(() => fetchCollectionById(id), [fetchCollectionById, id]);

  if (collection.id !== id) return <div>Loading...</div>;

  return (
    <Container>
      <Text textSize="display1">{collection.title}</Text>
      <Row>
        {collection.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
};

export default CollectionPage;
