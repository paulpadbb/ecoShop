import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpsellPage.css";

const UpsellPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderTotal, customerInfo, orderItems } = location.state || {};
  
  const [selectedUpsells, setSelectedUpsells] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Upsell products based on what they bought
  const upsellProducts = [
    {
      id: 'premium-bag',
      name: 'EcoShop Premium Reusable Bag',
      price: 12.99,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      description: 'Perfect for carrying your groceries. Made from recycled materials.',
      badge: 'ECO-FRIENDLY',
      savings: 7.00
    },
    {
      id: 'recipe-book',
      name: 'Healthy Recipes Digital Cookbook',
      price: 9.99,
      originalPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      description: '50+ recipes using fresh ingredients like the ones you just bought!',
      badge: 'DIGITAL DOWNLOAD',
      savings: 15.00
    },
    {
      id: 'storage-containers',
      name: 'Food Storage Container Set',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      description: 'Keep your food fresh longer with these airtight containers.',
      badge: 'BEST SELLER',
      savings: 20.00
    }
  ];

  const handleUpsellToggle = (productId) => {
    setSelectedUpsells(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const calculateUpsellTotal = () => {
    return selectedUpsells.reduce((total, productId) => {
      const product = upsellProducts.find(p => p.id === productId);
      return total + (product ? product.price : 0);
    }, 0);
  };

  const totalSavings = selectedUpsells.reduce((total, productId) => {
    const product = upsellProducts.find(p => p.id === productId);
    return total + (product ? product.savings : 0);
  }, 0);

  const handleCompleteOrder = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    navigate('/order-success', {
      state: {
        orderTotal: orderTotal + calculateUpsellTotal(),
        customerInfo,
        orderItems,
        upsellItems: selectedUpsells.map(id => upsellProducts.find(p => p.id === id)),
        totalSavings
      }
    });
  };

  const handleSkipUpsells = () => {
    navigate('/order-success', {
      state: {
        orderTotal,
        customerInfo,
        orderItems,
        upsellItems: [],
        totalSavings: 0
      }
    });
  };

  if (!orderTotal) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>Invalid Access</h2>
          <p>Please complete your order first.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="upsell-hero">
        <div className="text-center mb-4">
          <h1 className="display-4">🎉 Wait! Special Offers Just for You!</h1>
          <p className="lead">
            Thank you {customerInfo?.firstName}! Before we complete your order, 
            check out these exclusive deals that complement your purchase.
          </p>
          <div className="order-summary-badge">
            <span className="badge bg-success">Your Order: ${orderTotal?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="row">
        {upsellProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className={`card upsell-card ${selectedUpsells.includes(product.id) ? 'selected' : ''}`}>
              <div className="card-img-wrapper">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="badge-overlay">
                  <span className="badge bg-warning">{product.badge}</span>
                </div>
                <div className="savings-badge">
                  Save ${product.savings.toFixed(2)}
                </div>
              </div>
              
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                
                <div className="price-section">
                  <div className="current-price">${product.price.toFixed(2)}</div>
                  <div className="original-price">${product.originalPrice.toFixed(2)}</div>
                  <div className="discount-percentage">
                    {Math.round((product.savings / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                
                <button
                  className={`btn ${selectedUpsells.includes(product.id) ? 'btn-success' : 'btn-outline-primary'} w-100`}
                  onClick={() => handleUpsellToggle(product.id)}
                >
                  {selectedUpsells.includes(product.id) ? (
                    <>
                      ✓ Added to Order
                    </>
                  ) : (
                    <>
                      Add to Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="upsell-footer">
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h4>Order Summary</h4>
                <div className="summary-line">
                  <span>Original Order:</span>
                  <span>${orderTotal?.toFixed(2)}</span>
                </div>
                {selectedUpsells.length > 0 && (
                  <>
                    <div className="summary-line">
                      <span>Add-ons ({selectedUpsells.length}):</span>
                      <span>${calculateUpsellTotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-line savings">
                      <span>Total Savings:</span>
                      <span>-${totalSavings.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <hr />
                <div className="summary-line total">
                  <strong>Final Total:</strong>
                  <strong>${(orderTotal + calculateUpsellTotal()).toFixed(2)}</strong>
                </div>
              </div>
              
              <div className="col-md-6 text-end">
                <button
                  className="btn btn-outline-secondary me-3"
                  onClick={handleSkipUpsells}
                >
                  Skip & Complete Order
                </button>
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleCompleteOrder}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    `Complete Order - $${(orderTotal + calculateUpsellTotal()).toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="guarantee-section">
        <div className="row text-center">
          <div className="col-md-4">
            <div className="guarantee-item">
              <div className="guarantee-icon">🚚</div>
              <h6>Free Shipping</h6>
              <small>On all orders over $50</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="guarantee-item">
              <div className="guarantee-icon">🔒</div>
              <h6>Secure Payment</h6>
              <small>Your data is protected</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="guarantee-item">
              <div className="guarantee-icon">↩️</div>
              <h6>Easy Returns</h6>
              <small>30-day return policy</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpsellPage }; 