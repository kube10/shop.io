import { Container } from "@material-ui/core";
import ProductsList from "../components/product/ProductsList";

const HomePage = () => {
  return (
    <Container>
      <ProductsList amountOfItems={10} />
    </Container>
  );
};

export default HomePage;
