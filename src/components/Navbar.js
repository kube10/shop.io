import { useContext, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Link,
  Badge,
  Button,
} from "@material-ui/core";
import { spacing, palette } from "@material-ui/system";
import { MemoryRouter as Router } from "react-router";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import logo from "../assets/logo.svg";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Flag from "react-flags";

const Navbar = () => {
  const { openCart, fetchAllCollections, collections, checkout } = useContext(
    ShopContext
  );

  const history = useHistory();

  useEffect(() => {
    fetchAllCollections();
    return () => {};
  }, [fetchAllCollections]);

  return (
    <Box>
      <Box style={{ backgroundColor: "#EEEEEE" }}>
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>Free shipping from €150!</Box>
            <Box display="flex">
              <Box mx={2} display="flex" alignItems="center">
                <Typography variant="body2" style={{ lineHeight: ".8em" }}>
                  <Link color="textSecondary" component={RouterLink} to={`/`}>
                    Company
                  </Link>
                </Typography>
              </Box>
              <Box mx={2} display="flex" alignItems="center">
                <Typography variant="body2" style={{ lineHeight: ".8em" }}>
                  <Link color="textSecondary" component={RouterLink} to={`/`}>
                    Help
                  </Link>
                </Typography>
              </Box>
              <Box mx={2} display="flex" alignItems="center">
                <Typography variant="body2" style={{ lineHeight: ".8em" }}>
                  <Link color="textSecondary" component={RouterLink} to={`/`}>
                    Stores
                  </Link>
                </Typography>
              </Box>
              <Box mx={2} display="flex" alignItems="center">
                <Typography variant="body2" style={{ lineHeight: ".8em" }}>
                  <Link color="textSecondary" component={RouterLink} to={`/`}>
                    Newsletter
                  </Link>
                </Typography>
              </Box>
              <Box ml={2} display="flex" alignItems="center">
                <Box mx={1}>
                  <Typography
                    style={{ lineHeight: ".8em" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    BE - {checkout.currencyCode}
                  </Typography>
                </Box>
                <Flag
                  name="BE"
                  basePath={`${process.env.PUBLIC_URL}/assets/flags/vendor/flags`}
                  format="png"
                  pngSize={24}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <Box display="flex" py={2} justifyContent="space-between">
          <Box display="flex" alignItems="center" justifyContent="">
            <img
              src={logo}
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/")}
            />
          </Box>

          <Box display="flex" alignItems="center">
            {collections.map((collection) => {
              return (
                <Box key={collection.id} mx={2}>
                  <Typography variant="button">
                    <Link
                      color="textPrimary"
                      component={RouterLink}
                      to={`/collection/${collection.id}`}
                    >
                      {collection.title}
                    </Link>
                  </Typography>
                </Box>
              );
            })}
            <Box mx={2}>
              <Typography variant="button">
                <Link
                  color="secondary"
                  component={RouterLink}
                  to={`/discounts`}
                >
                  Discounts
                </Link>
              </Typography>
            </Box>
            <Button>
              <Badge
                badgeContent={
                  checkout.lineItems ? checkout.lineItems.length : 0
                }
                color="secondary"
              >
                <ShoppingCartOutlinedIcon
                  style={{ fontSize: 32 }}
                  onClick={() => openCart()}
                />
              </Badge>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
