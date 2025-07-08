import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const CheckoutPage = ({ products, inCartProducts, onRemoveFromCart, onUpdateQuantity, clearCartAndRefreshProducts }) => {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentInfo, setPaymentInfo] = React.useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [loading, setLoading] = React.useState(false);

  // Get items in cart
  const itemsInCart = products.filter(product => inCartProducts[product.id] > 0);
  
  // Calculate totals
  const subtotal = itemsInCart.reduce((total, product) => {
    return total + (product.price * inCartProducts[product.id]);
  }, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const handleInputChange = (section, field, value) => {
    if (section === 'customer') {
      setCustomerInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the purchase data
      const purchaseData = {};
      itemsInCart.forEach(product => {
        purchaseData[product.id] = inCartProducts[product.id];
      });

      // API URL configuration
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://ecoshop-m9ed.onrender.com/purchase' 
        : 'http://localhost:8080/purchase';

      // Make the purchase API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_quantity_purchased: purchaseData
        })
      });

      const result = await response.json();

      if (result.success) {
        // Purchase successful, clear cart and refresh products
        clearCartAndRefreshProducts();
        
        // Navigate to success page
        navigate('/upsell', { 
          state: { 
            orderTotal: total,
            customerInfo,
            orderItems: itemsInCart,
            purchaseSuccess: true
          }
        });
      } else {
        // Purchase failed, show error message
        alert(`Purchase failed: ${result.message}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Network error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (itemsInCart.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>Your cart is empty</h2>
          <p className="text-muted">Add some items to your cart to proceed with checkout</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card checkout-form">
            <div className="card-header">
              <h3>Checkout</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Customer Information */}
                <div className="section">
                  <h4 className="section-title">🏠 Shipping Information</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          value={customerInfo.firstName}
                          onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                          required
                        />
                        <label htmlFor="firstName">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          value={customerInfo.lastName}
                          onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                          required
                        />
                        <label htmlFor="lastName">Last Name</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          value={customerInfo.email}
                          onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                          required
                        />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Phone"
                          value={customerInfo.phone}
                          onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                          required
                        />
                        <label htmlFor="phone">Phone Number</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('customer', 'address', e.target.value)}
                      required
                    />
                    <label htmlFor="address">Street Address</label>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          placeholder="City"
                          value={customerInfo.city}
                          onChange={(e) => handleInputChange('customer', 'city', e.target.value)}
                          required
                        />
                        <label htmlFor="city">City</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          placeholder="ZIP Code"
                          value={customerInfo.zipCode}
                          onChange={(e) => handleInputChange('customer', 'zipCode', e.target.value)}
                          required
                        />
                        <label htmlFor="zipCode">ZIP Code</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="country"
                          value={customerInfo.country}
                          onChange={(e) => handleInputChange('customer', 'country', e.target.value)}
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                        <label htmlFor="country">Country</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="section">
                  <h4 className="section-title">💳 Payment Information</h4>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      placeholder="Card Number"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                      required
                    />
                    <label htmlFor="cardNumber">Card Number</label>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          required
                        />
                        <label htmlFor="expiryDate">Expiry Date</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          placeholder="CVV"
                          value={paymentInfo.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          required
                        />
                        <label htmlFor="cvv">CVV</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="cardName"
                      placeholder="Name on Card"
                      value={paymentInfo.cardName}
                      onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                      required
                    />
                    <label htmlFor="cardName">Name on Card</label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    `Complete Order - $${total.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card order-summary">
            <div className="card-header">
              <h4>Order Summary</h4>
            </div>
            <div className="card-body">
              {itemsInCart.map(product => (
                <div key={product.id} className="order-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{product.name}</h6>
                      <small className="text-muted">Qty: {inCartProducts[product.id]}</small>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold">${(product.price * inCartProducts[product.id]).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <hr />
              
              <div className="order-totals">
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <small className="text-success">🎉 Free shipping on orders over $50!</small>
                )}
                <hr />
                <div className="d-flex justify-content-between total">
                  <strong>Total:</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CheckoutPage }; 