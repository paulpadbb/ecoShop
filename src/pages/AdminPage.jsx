import * as React from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [refillQuantities, setRefillQuantities] = React.useState({});
  const [newProduct, setNewProduct] = React.useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    image_url: ''
  });
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  const getApiUrl = (endpoint) => {
    return process.env.NODE_ENV === 'production' 
      ? `https://ecoshop-m9ed.onrender.com${endpoint}`
      : `http://localhost:8080${endpoint}`;
  };

  // Fetch products from the backend
  const fetchProducts = React.useCallback(() => {
    setLoading(true);
    setError(null);
    
    fetch(getApiUrl('/products'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
          // Initialize refill quantities
          const initialQuantities = {};
          data.products.forEach(product => {
            initialQuantities[product.id] = '';
          });
          setRefillQuantities(initialQuantities);
        }
      })
      .catch((error) => {
        setError('Failed to fetch products: ' + error.message);
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle refill quantity input change
  const handleRefillQuantityChange = (productId, value) => {
    setRefillQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  // Handle product refill
  const handleRefillProduct = (productId) => {
    const quantity = parseInt(refillQuantities[productId]);
    
    if (!quantity || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    fetch(getApiUrl('/admin/refill'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Product refilled successfully!');
        // Reset the quantity input
        setRefillQuantities(prev => ({
          ...prev,
          [productId]: ''
        }));
        // Refresh products
        fetchProducts();
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error refilling product:', error);
      alert('Failed to refill product');
    });
  };

  // Handle new product input change
  const handleNewProductChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle create new product
  const handleCreateProduct = () => {
    // Validate inputs
    if (!newProduct.id || !newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.image_url) {
      alert('Please fill in all fields');
      return;
    }

    const price = parseInt(newProduct.price);
    const stock = parseInt(newProduct.stock);

    if (isNaN(price) || price <= 0) {
      alert('Price must be a positive number');
      return;
    }

    if (isNaN(stock) || stock < 0) {
      alert('Stock must be a non-negative number');
      return;
    }

    fetch(getApiUrl('/admin/create'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newProduct.id,
        name: newProduct.name,
        price: price,
        stock: stock,
        image_url: newProduct.image_url
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Product created successfully!');
        // Reset the form
        setNewProduct({
          id: '',
          name: '',
          price: '',
          stock: '',
          image_url: ''
        });
        setShowCreateForm(false);
        // Refresh products
        fetchProducts();
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🛠️ Admin Dashboard</h1>
        <p>Manage your products and inventory</p>
      </div>

      <div className="admin-actions">
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : '+ Add New Product'}
        </button>
        <button 
          className="btn btn-secondary"
          onClick={fetchProducts}
        >
          🔄 Refresh Products
        </button>
      </div>

      {showCreateForm && (
        <div className="create-product-form">
          <h3>Create New Product</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="text"
                value={newProduct.id}
                onChange={(e) => handleNewProductChange('id', e.target.value)}
                placeholder="e.g., SHOP-0015"
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => handleNewProductChange('name', e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => handleNewProductChange('price', e.target.value)}
                placeholder="Price in cents"
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => handleNewProductChange('stock', e.target.value)}
                placeholder="Initial stock"
                min="0"
              />
            </div>
            <div className="form-group full-width">
              <label>Image URL:</label>
              <input
                type="url"
                value={newProduct.image_url}
                onChange={(e) => handleNewProductChange('image_url', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div className="form-actions">
            <button 
              className="btn btn-primary"
              onClick={handleCreateProduct}
            >
              Create Product
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="products-table-container">
        <h3>Products Inventory</h3>
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Refill</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${(product.price / 100).toFixed(2)}</td>
                <td>
                  <span className={`stock-badge ${product.stock <= 5 ? 'low-stock' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <div className="refill-controls">
                    <input
                      type="number"
                      value={refillQuantities[product.id] || ''}
                      onChange={(e) => handleRefillQuantityChange(product.id, e.target.value)}
                      placeholder="Qty"
                      min="1"
                      className="refill-input"
                    />
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleRefillProduct(product.id)}
                    >
                      Refill
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { AdminPage }; 