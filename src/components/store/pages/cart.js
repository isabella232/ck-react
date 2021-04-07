import React from "react";
import currency from "currency.js";
import { Link } from "react-router-dom";

import Product from "../../../models/product";
import Page from "../page";
import ProductThumb from "../product/thumb";
import Price from "../product/price";
import useCart from "../../../hooks/cart";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";

const CheckoutRightLevel = ({ subTotal }) => {
  return (
    <></>
  );
};

export default () => {
  const { cart, subTotal } = useCart();
  const formattedSubTotal = currency(subTotal).format();

  return (
    <Page
      title="Cart"
      right={<CheckoutRightLevel subTotal={formattedSubTotal} />}
    >
      <div className="cart-page">
        <div className="columns is-multiline">
          {cart.map((item) => {
            const product = Product.find(item.category, item.slug);

            return (
              <div className="column is-full cart-row" key={item.slug}>
                <div className="columns is-vcentered is-mobile">
                  <div className="column is-2">
                    <ProductThumb product={product} />
                  </div>
                  <div className="column is-5">
                    <p>
                      <Link to={product.url}>{product.name}</Link>
                    </p>
                    <p>{product.formattedPrice()}</p>
                  </div>
                  <div className="column is-2">Qty: {item.qty}</div>
                  <div className="column is-2">
                    <Price product={product} />
                  </div>
                  <div className="column is-1">
                    <button
                      className="button button-remove"
                      onClick={() => product.removeFromCart()}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="divider"></div>

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="subtotal">
                <h3 className="is-size-5">Subtotal</h3>
                <p>Shipping & taxes calculated at checkout</p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <p className="is-size-4">{formattedSubTotal}</p>
            </div>
          </div>
        </div>
        <div className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <div className="level-item">
              {formattedSubTotal !== "$0.00" && (
                <Link
                  to="/store/checkout"
                  className="cart-button"
                >
                  Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
