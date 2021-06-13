import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { useEffect, useContext, useState } from "react";
import { Container, Row, Text } from "atomize";
import ProductCard from "../components/product/ProductCard";
import ProductsLoading from "../components/loadingStates/ProductsLoading";
import Pagination from "../components/Pagination";
import ProductsList from "../components/product/ProductsList";

const CollectionPage = () => {
  const { id } = useParams();

  return (
    <Container>
      <ProductsList collectionId={id} amountOfItems={8} />
    </Container>
  );
};

export default CollectionPage;
