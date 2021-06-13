import { Container } from "@material-ui/core";
import ProductsList from "../components/product/ProductsList";

const DiscountPage = () => {
  return (
    <Container>
      <ProductsList amountOfItems={10} discount />
    </Container>
  );
};

export default DiscountPage;
