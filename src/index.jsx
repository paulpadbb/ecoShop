import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { UpsellPage } from "./pages/UpsellPage";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import { FAQPage } from "./pages/FAQPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  // availableProducts is an object that looks like
  // { ['product 1 name']: number of products 1 available,
  //   ['product 2 name']: number of products 2 available,
  //    ....
  //  }
  const [availableProducts, setAvailableProducts] = React.useState({});

  // inCartProducts is an object that looks like
  // { ['product 1 name']: number of products 1 in cart,
  //   ['product 2 name']: number of products 2 in cart,
  //    ....
  //  }
  // A product item is either available or in cart so that
  // product.stock = availableProducts[product.id] + inCartProducts[product.id]
  const [inCartProducts, setInCartProducts] = React.useState({});

  // Get unique categories from products
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => {
      // Simple category extraction based on product name
      if (product.name.toLowerCase().includes('milk') || product.name.toLowerCase().includes('soda')) return 'Beverages';
      if (product.name.toLowerCase().includes('broccoli') || product.name.toLowerCase().includes('carrots')) return 'Vegetables';
      if (product.name.toLowerCase().includes('eggs') || product.name.toLowerCase().includes('cheese')) return 'Dairy';
      return 'Other';
    }))];
    return ['all', ...uniqueCategories];
  }, [products]);

  // Filter products based on search term and category
  const filteredProducts = React.useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const productCategory = product.name.toLowerCase().includes('milk') || product.name.toLowerCase().includes('soda') ? 'Beverages' :
                            product.name.toLowerCase().includes('broccoli') || product.name.toLowerCase().includes('carrots') ? 'Vegetables' :
                            product.name.toLowerCase().includes('eggs') || product.name.toLowerCase().includes('cheese') ? 'Dairy' : 'Other';
      const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Get cart item count for sidebar badge
  const cartItemCount = Object.values(inCartProducts).reduce((total, quantity) => total + quantity, 0);

  // Fetch products from the backend
  // and store them in the products state.
  React.useEffect(() => {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://ecoshop-m9ed.onrender.com/products' 
      : 'http://localhost:8080/products';
    
    console.log('Fetching from:', apiUrl);
    console.log('Environment:', process.env.NODE_ENV);
    
    fetch(apiUrl)
      .then((response) => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((products) => {
        console.log('API Response:', products);
        
        if (products && products.products) {
          setProducts(products.products);

          // Initialize availableProducts and cartProducts
          const initialAvailableProducts = products.products.reduce(
            (acc, curr) => {
              return { ...acc, [curr.id]: curr.stock };
            },
            {}
          );
          const initialInCartProducts = products.products.reduce((acc, curr) => {
            return { ...acc, [curr.id]: 0 };
          }, {});

          setAvailableProducts(initialAvailableProducts);
          setInCartProducts(initialInCartProducts);
        } else {
          console.error('Invalid API response format:', products);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        // You could set an error state here to show an error message to users
      });
  }, []);

  // Add a product to cart.
  // Updating corresponding quantities in availableProducts and inCartProducts
  const onAddToCart = (productId) => {
    const availableBeforeAdd = availableProducts[productId];
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeAdd - 1,
    });
    const inCartBeforeAdd = inCartProducts[productId];
    setInCartProducts({
      ...inCartProducts,
      [productId]: inCartBeforeAdd + 1,
    });
  };

  // Remove a product from cart.
  // Updating corresponding quantities in availableProducts and inCartProducts
  const onRemoveFromCart = (productId) => {
    const availableBeforeRemove = availableProducts[productId];
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeRemove + 1,
    });
    const inCartBeforeRemove = inCartProducts[productId];
    setInCartProducts({
      ...inCartProducts,
      [productId]: inCartBeforeRemove - 1,
    });
  };

  // Clear cart and refresh products (for after purchase)
  const clearCartAndRefreshProducts = () => {
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://ecoshop-m9ed.onrender.com/products' 
      : 'http://localhost:8080/products';
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((products) => {
        if (products && products.products) {
          setProducts(products.products);

          // Reset availableProducts and clear cart
          const updatedAvailableProducts = products.products.reduce(
            (acc, curr) => {
              return { ...acc, [curr.id]: curr.stock };
            },
            {}
          );
          const clearedCartProducts = products.products.reduce((acc, curr) => {
            return { ...acc, [curr.id]: 0 };
          }, {});

          setAvailableProducts(updatedAvailableProducts);
          setInCartProducts(clearedCartProducts);
        }
      })
      .catch((error) => {
        console.error('Error refreshing products:', error);
      });
  };

  return (
    <Router>
      <div className="App" style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar cartItemCount={cartItemCount} />
        
        <main style={{ 
          marginLeft: '280px', 
          width: 'calc(100% - 280px)', 
          padding: '20px',
          minHeight: '100vh',
          backgroundColor: 'var(--light-bg)'
        }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage
                  products={products}
                  availableProducts={availableProducts}
                  inCartProducts={inCartProducts}
                  onAddToCart={onAddToCart}
                  onRemoveFromCart={onRemoveFromCart}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categories={categories}
                  filteredProducts={filteredProducts}
                />
              } 
            />
            
            <Route 
              path="/checkout" 
              element={
                <CheckoutPage
                  products={products}
                  inCartProducts={inCartProducts}
                  onRemoveFromCart={onRemoveFromCart}
                  clearCartAndRefreshProducts={clearCartAndRefreshProducts}
                />
              } 
            />
            
            <Route path="/upsell" element={<UpsellPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Placeholder routes for future implementation */}
            <Route 
              path="/login" 
              element={
                <div className="container mt-5 text-center animate-fade-in">
                  <div className="card shadow-lg border-0">
                    <div className="card-body p-5">
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔐</div>
                      <h2 className="mb-3" style={{ color: 'var(--primary-color)' }}>Login Page</h2>
                      <p className="text-muted mb-4">Secure authentication coming soon!</p>
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        This feature is under development
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/register" 
              element={
                <div className="container mt-5 text-center animate-fade-in">
                  <div className="card shadow-lg border-0">
                    <div className="card-body p-5">
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
                      <h2 className="mb-3" style={{ color: 'var(--primary-color)' }}>Register Page</h2>
                      <p className="text-muted mb-4">Account creation coming soon!</p>
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        This feature is under development
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <div className="container mt-5 text-center animate-fade-in">
                  <div className="card shadow-lg border-0">
                    <div className="card-body p-5">
                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👤</div>
                      <h2 className="mb-3" style={{ color: 'var(--primary-color)' }}>Profile Page</h2>
                      <p className="text-muted mb-4">User profiles coming soon!</p>
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        This feature is under development
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className="container mt-5 text-center animate-fade-in">
                  <div className="card shadow-lg border-0">
                    <div className="card-body p-5">
                      <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🔍</div>
                      <h1 className="display-4 mb-3" style={{ color: 'var(--danger-color)' }}>404</h1>
                      <h3 className="mb-3">Page Not Found</h3>
                      <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn btn-primary btn-lg">
                        <i className="fas fa-home me-2"></i>
                        Go Home
                      </a>
                    </div>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
      
      {/* Global styles for responsive sidebar */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .App main {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
        
        /* Prevent body scroll when sidebar is open on mobile */
        body.sidebar-open {
          overflow: hidden;
        }
      `}</style>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
