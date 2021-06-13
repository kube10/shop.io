import ProductCard from "./ProductCard";
import ProductsLoading from "../loadingStates/ProductsLoading";
import Pagination from "../Pagination";
import { ShopContext } from "../../context/shopContext";
import { Row, Div } from "atomize";
import { Grid } from "@material-ui/core";
import { useEffect, useContext, useState } from "react";

const ProductsList = ({ collectionId, amountOfItems, discount }) => {
  const {
    fetchCollectionById,
    collection,
    pageCount,
    products,
    fetchAllProducts,
    fetchDiscountedProducts,
  } = useContext(ShopContext);
  const [activePage, setActivePage] = useState(0);

  useEffect(
    () =>
      collectionId
        ? fetchCollectionById(collectionId, amountOfItems)
        : discount
        ? fetchDiscountedProducts(amountOfItems)
        : fetchAllProducts(amountOfItems),
    [fetchCollectionById, collectionId]
  );

  if (collection) {
    if (collection.id != collectionId) {
      return <ProductsLoading />;
    }
  } else {
    if (products.length === 0) {
      return <ProductsLoading />;
    }
  }

  return (
    <>
      <Grid container spacing={4}>
        {products
          .slice(
            amountOfItems * activePage,
            amountOfItems + amountOfItems * activePage
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Grid>

      <Pagination pageCount={pageCount} setActivePage={setActivePage} />
    </>
  );
};

export default ProductsList;
