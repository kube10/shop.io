import { Text, Div, Row, Col, Anchor } from "atomize";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { positions, palette, spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";
import { useState, useContext } from "react";
import VariantButton from "./VariantButton";

const useStyles = makeStyles({
  media: {
    height: 368,
    transition: "all .3s ease",
  },
  card: {
    position: "relative",
  },
  lineThrough: {
    textDecoration: "line-through",
  },
});

const ProductCard = ({ product }) => {
  const { checkout, openCart, addItemToCheckout } = useContext(ShopContext);

  const [activeVariant, setActiveVariant] = useState();
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const classes = useStyles();

  const productPrice = !activeVariant ? (
    product.variants[0].compareAtPrice != null ? (
      <Box display="flex">
        <Box mr={1}>
          <Typography
            color="secondary"
            className={classes.lineThrough}
            variant="button"
          >
            {product.variants[0].compareAtPrice}
          </Typography>
        </Box>
        {product.variants[0].price} {checkout.currencyCode}
      </Box>
    ) : (
      `${product.variants[0].price} ${checkout.currencyCode}`
    )
  ) : product.variants.find((variant) => variant.id === activeVariant)
      .compareAtPrice != null ? (
    <Box display="flex">
      <Box mr={1}>
        <Typography
          color="secondary"
          className={classes.lineThrough}
          variant="button"
        >
          {
            product.variants.find((variant) => variant.id === activeVariant)
              .compareAtPrice
          }
        </Typography>
      </Box>
      {product.variants.find((variant) => variant.id === activeVariant).price}{" "}
      {checkout.currencyCode}
    </Box>
  ) : (
    `${
      product.variants.find((variant) => variant.id === activeVariant).price
    } ${checkout.currencyCode}`
  );

  const addToCart = (e) => {
    addItemToCheckout(e.target.id, 1);
    openCart();
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card} variant="outlined">
        <Link to={`/product/${product.id}`}>
          <CardMedia
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            image={product.images[0].src}
            className={classes.media}
          />
        </Link>{" "}
        <Box
          bgcolor="white"
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p={1}
          onMouseEnter={() => setShowQuickAdd(true)}
          onMouseLeave={() => setShowQuickAdd(false)}
        >
          <Link to={`/product/${product.id}`}>
            <Typography color="textPrimary" variant="subtitle1">
              {product.title}
            </Typography>
          </Link>

          <Typography color="primary" variant="button">
            {productPrice}
          </Typography>

          {showQuickAdd && (
            <Box>
              <Typography
                color="textPrimary"
                variant="subtitle2"
                align="center"
              >
                Add to cart:
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                py={1}
                flexwrap="wrap"
              >
                {product.variants.map((variant) => (
                  <VariantButton
                    key={variant.id}
                    variant={variant}
                    activeVariant={activeVariant}
                    mouseEnter={(e) => setActiveVariant(e.target.id)}
                    mouseLeave={(e) => setActiveVariant(undefined)}
                    click={addToCart}
                    product={product}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductCard;
