import * as React from "react";
import { Shop } from "../components/Shop/Shop";
import { Cart } from "../components/Cart/Cart";

const HomePage = (props) => {
  return (
    <div className="home-page animate-fade-in">
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-lg-8">
            <Shop
              products={props.filteredProducts}
              availableProducts={props.availableProducts}
              onAddToCart={props.onAddToCart}
              searchTerm={props.searchTerm}
              setSearchTerm={props.setSearchTerm}
              selectedCategory={props.selectedCategory}
              setSelectedCategory={props.setSelectedCategory}
              categories={props.categories}
            />
          </div>
          <div className="col-lg-4">
            <Cart 
              products={props.products} 
              inCartProducts={props.inCartProducts} 
              onRemoveFromCart={props.onRemoveFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage }; 