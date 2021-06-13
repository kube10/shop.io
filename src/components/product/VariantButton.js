import { ShopContext } from "../../context/shopContext";
import { useContext } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cursorPointer: {
    cursor: "pointer",
  },
});

const VariantButton = ({
  product,
  variant,
  activeVariant,
  mouseEnter,
  mouseLeave,
  click,
}) => {
  const { openCart, addItemToCheckout } = useContext(ShopContext);

  const textColor = () => {
    if (!activeVariant) {
      if (product.variants[0].id === variant.id) {
        return "primary";
      } else {
        return "textPrimary";
      }
    } else {
      if (activeVariant === variant.id) {
        return "primary";
      } else {
        return "textPrimary";
      }
    }
  };

  const classes = useStyles();

  return (
    <Typography
      size="small"
      className={classes.cursorPointer}
      key={variant.id}
      id={variant.id}
      onClick={click}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      label={variant.title.toUpperCase()}
      color={textColor()}
      variant="button"
    >
      {variant.title.toUpperCase()}
    </Typography>
  );
};

export default VariantButton;
