import React, { Component } from "react";
import Client from "shopify-buy";

//Shopify Storefront API docs
//https://shopify.github.io/js-buy-sdk/?shpxid=f63a5c17-47BF-4DC7-6A17-253CF82672E7

const ShopContext = React.createContext();

const client = Client.buildClient({
  storefrontAccessToken: process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    activeVariant: {},
    collections: [],
    collection: {},
    checkout: {},
    isCartOpen: false,
  };

  componentDidMount() {
    this.createCheckout();
  }

  createCheckout = async () => {
    if (localStorage.getItem("checkout")) {
      this.setState({ checkout: JSON.parse(localStorage.getItem("checkout")) });
    } else {
      const checkout = await client.checkout.create();
      this.setState({ checkout: checkout });
      localStorage.setItem("checkout", JSON.stringify(checkout));
    }
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );

    this.setState({ checkout: checkout });
    localStorage.removeItem("checkout");
    localStorage.setItem("checkout", JSON.stringify(checkout));
  };

  removeItemsFromCheckout = async (lineItemsToRemove) => {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      lineItemsToRemove
    );

    this.setState({ checkout: checkout });
    localStorage.removeItem("checkout");
    localStorage.setItem("checkout", JSON.stringify(checkout));
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  };

  fetchProductById = async (id) => {
    const product = await client.product.fetch(id);
    const variant = product.variants[0];
    this.setState({ product: product });
    this.setState({ activeVariant: variant });
  };

  setVariantByIdAsActive = (variantId) => {
    const variant = this.state.product.variants.find(
      (variant) => variant.id === variantId
    );
    this.setState({ activeVariant: variant });
  };

  fetchAllCollections = async () => {
    const collections = await client.collection.fetchAllWithProducts();
    this.setState({ collections: collections });
  };

  fetchCollectionById = async (id) => {
    const collection = await client.collection.fetchWithProducts(id);
    this.setState({ collection: collection });
  };

  closeCart = async () => {
    this.setState({ isCartOpen: false });
  };

  openCart = async () => {
    this.setState({ isCartOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductById: this.fetchProductById,
          fetchAllCollections: this.fetchAllCollections,
          fetchCollectionById: this.fetchCollectionById,
          setVariantByIdAsActive: this.setVariantByIdAsActive,
          closeCart: this.closeCart,
          openCart: this.openCart,
          addItemToCheckout: this.addItemToCheckout,
          removeItemsFromCheckout: this.removeItemsFromCheckout,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
