import * as React from "react";
import "./index.css";

const Shop = (props) => {
  return (
    <div className="shop-container animate-fade-in">
      {/* Shop Header */}
      <div className="shop-header">
        <h1>🛍️ Shop</h1>
        <p className="mb-0">Discover fresh, sustainable products</p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="search-input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={props.selectedCategory}
              onChange={(e) => props.setSelectedCategory(e.target.value)}
            >
              {props.categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '🏷️ All Categories' : `📦 ${category}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="results-counter">
        <span>
          ✨ {props.products.length} product{props.products.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Products Grid */}
      {props.products.length === 0 ? (
        <div className="no-products">
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
          <h5>No products found</h5>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="products-grid">
          {props.products.map((product) => {
            const availableStock = props.availableProducts[product.id];
            const isOutOfStock = availableStock === 0;
            
            return (
              <div className="product-card" key={product.id}>
                <div className="card shadow-sm">
                  <div className="card-img-container">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    
                    <div className="price-container">
                      <span className="price">${product.price}</span>
                    </div>
                    
                    <div className="stock-info">
                      <span className={`badge ${
                        availableStock > 5 ? 'bg-success stock-available' : 
                        availableStock > 0 ? 'bg-warning stock-low' : 
                        'bg-danger stock-out'
                      }`}>
                        {availableStock > 0 ? 
                          `📦 ${availableStock} in stock` : 
                          '❌ Out of stock'
                        }
                      </span>
                    </div>
                    
                    <button
                      onClick={() => props.onAddToCart(product.id)}
                      className={`btn w-100 add-to-cart-btn ${isOutOfStock ? 'btn-secondary' : 'btn-primary'}`}
                      disabled={isOutOfStock}
                    >
                      {isOutOfStock ? 
                        <><i className="fas fa-times"></i> Out of Stock</> : 
                        <><i className="fas fa-plus"></i> Add to Cart</>
                      }
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { Shop };
