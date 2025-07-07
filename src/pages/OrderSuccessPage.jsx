import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderTotal, customerInfo, orderItems, upsellItems, totalSavings } = location.state || {};

  React.useEffect(() => {
    // Confetti animation
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = () => {
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!orderTotal) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>No Order Found</h2>
          <p>It looks like you haven't placed an order yet.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-body text-center p-5">
              <div className="success-icon mb-4">
                <div style={{ fontSize: '4rem', color: '#28a745' }}>🎉</div>
              </div>
              
              <h1 className="display-4 text-success mb-3">Order Confirmed!</h1>
              <p className="lead text-muted mb-4">
                Thank you {customerInfo?.firstName}! Your order has been placed successfully.
              </p>
              
              <div className="order-summary bg-light p-4 rounded mb-4">
                <h5 className="mb-3">Order Summary</h5>
                
                {/* Order Items */}
                {orderItems && orderItems.length > 0 && (
                  <div className="mb-3">
                    <h6>Items Ordered:</h6>
                    {orderItems.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between mb-1">
                        <span>{item.name}</span>
                        <span>${item.price?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upsell Items */}
                {upsellItems && upsellItems.length > 0 && (
                  <div className="mb-3">
                    <h6>Bonus Items:</h6>
                    {upsellItems.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between mb-1">
                        <span>{item.name}</span>
                        <span>${item.price?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Order Total:</span>
                  <span className="fw-bold">${orderTotal?.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>You Saved:</span>
                    <span className="fw-bold">-${totalSavings?.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between mb-2">
                  <span>Estimated Delivery:</span>
                  <span>3-5 business days</span>
                </div>
              </div>

              <div className="row text-start">
                <div className="col-md-6">
                  <h6>Shipping Address:</h6>
                  <p className="text-muted">
                    {customerInfo?.firstName} {customerInfo?.lastName}<br/>
                    {customerInfo?.address}<br/>
                    {customerInfo?.city}, {customerInfo?.zipCode}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>Contact Info:</h6>
                  <p className="text-muted">
                    {customerInfo?.email}<br/>
                    {customerInfo?.phone}
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-center mt-4">
                <button 
                  onClick={() => navigate('/')} 
                  className="btn btn-primary"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={() => navigate('/faq')} 
                  className="btn btn-outline-secondary"
                >
                  Need Help?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { OrderSuccessPage }; 