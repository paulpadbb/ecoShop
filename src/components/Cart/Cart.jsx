import * as React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  // Calculate total price
  const totalPrice = props.products.reduce((total, product) => {
    const quantity = props.inCartProducts[product.id];
    return total + (product.price * quantity);
  }, 0);

  // Get items in cart (with quantity > 0)
  const itemsInCart = props.products.filter(product => props.inCartProducts[product.id] > 0);

  // Empty cart illustration component
  const EmptyCartIllustration = () => (
    <div className="empty-cart-container">
      <div className="empty-cart-illustration">
        <div className="cart-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h4 className="empty-cart-title">Your cart is empty</h4>
        <p className="empty-cart-subtitle">Add some delicious products to get started!</p>
        <div className="floating-elements">
          <div className="floating-element">🛒</div>
          <div className="floating-element">📦</div>
          <div className="floating-element">🛍️</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card cart-container animate-fade-in">
      <div className="card-header">
        <h1>Shopping Cart</h1>
        <span className="badge cart-count">{itemsInCart.length}</span>
      </div>
      
      {itemsInCart.length === 0 ? (
        <EmptyCartIllustration />
      ) : (
        <>
          <div className="cart-items-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">📦 Item</th>
                  <th scope="col">🔢 Quantity</th>
                  <th scope="col">💰 Price</th>
                  <th scope="col">⚡ Action</th>
                </tr>
              </thead>
              <tbody>
                {props.products.map((product) => {
                  const quantity = props.inCartProducts[product.id];
                  // Don't display item if quantity is zero
                  if (quantity === 0) return null;
                  
                  return (
                    <tr key={product.id} className="cart-item">
                      <td className="product-name">{product.name}</td>
                      <td>
                        <span className="quantity-badge">{quantity}</span>
                      </td>
                      <td className="product-price">{product.price}</td>
                      <td>
                        <button
                          onClick={() => props.onRemoveFromCart(product.id)}
                          className="btn btn-danger btn-sm remove-btn"
                          title="Remove item from cart"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div onClick={() =>  navigate("/checkout")} className="cart-total">
            <span className="total-label">💵 Total:</span>
            <span className="total-amount">{totalPrice.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export { Cart };
