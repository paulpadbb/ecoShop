package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"runtime"

	_ "github.com/mattn/go-sqlite3"
)

type Product struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Stock    int    `json:"stock"`
	ImageURL string `json:"image_url"`
}
type ProductsResponse struct {
	Products []*Product `json:"products"`
}

type PurchaseRequest struct {
	ProductQuantityPurchased map[string]int `json:"product_quantity_purchased"`
}

type PurchaseResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

func initDatabase() (*sql.DB, error) {
	// Get the current file's directory
	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)
	dbPath := filepath.Join(dir, "products.db")

	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	// Create products table if it doesn't exist
	createTableQuery := `
	CREATE TABLE IF NOT EXISTS products (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		price INTEGER NOT NULL,
		stock INTEGER NOT NULL,
		image_url TEXT NOT NULL
	);`

	_, err = db.Exec(createTableQuery)
	if err != nil {
		return nil, err
	}

	// Insert sample data if table is empty
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM products").Scan(&count)
	if err != nil {
		return nil, err
	}

	if count == 0 {
		insertQuery := `
		INSERT INTO products (id, name, price, stock, image_url) VALUES
		('SHOP-0011', 'Milk', 10, 20, 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'),
		('SHOP-0012', 'Soda', 11, 5, 'https://img-4.linternaute.com/mKXTbLlU0h1MoT6HRZy_FDyK7CI=/900x/smart/a8506dcf71b64b78bb5a66c7ce9cc05c/ccmcms-linternaute/13497750.jpg'),
		('SHOP-0013', 'Bread', 8, 15, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
		('SHOP-0014', 'Eggs', 12, 30, 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');`

		_, err = db.Exec(insertQuery)
		if err != nil {
			return nil, err
		}
	}

	return db, nil
}

func getProducts(db *sql.DB) ([]*Product, error) {
	rows, err := db.Query("SELECT id, name, price, stock, image_url FROM products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*Product
	for rows.Next() {
		product := &Product{}
		err := rows.Scan(&product.ID, &product.Name, &product.Price, &product.Stock, &product.ImageURL)
		if err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	return products, nil
}

func purchaseProducts(db *sql.DB, productQuantityPurchased map[string]int) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	for id, quantity := range productQuantityPurchased {
		var stock int
		err = tx.QueryRow("SELECT stock FROM products WHERE id = ?", id).Scan(&stock)
		if err != nil {
			return err
		}

		if stock < quantity {
			return fmt.Errorf("product %s out of stock", id)
		}

		updatedStock := stock - quantity
		_, err = tx.Exec("UPDATE products SET stock = ? WHERE id = ?", updatedStock, id)
		if err != nil {
			return err
		}
	}

	return tx.Commit()
}

// Handler replies with the products response to any request
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "OPTIONS" {
		// Preflight request, return OK directly
		w.WriteHeader(http.StatusOK)
		return
	}
	//// TODO
	//// Add code to convert the product variable declared above into a json
	//// You can use the Marshal function of the json package
	//// Don't forget to use the ProductsResponse structure
	//// Should start with "b, err :="
	// Initialize database
	db, err := initDatabase()
	if err != nil {
		http.Error(w, "Database initialization failed", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// Get products from database
	products, err := getProducts(db)
	if err != nil {
		http.Error(w, "Failed to fetch products", http.StatusInternalServerError)
		return
	}

	b, err := json.Marshal(ProductsResponse{Products: products})
	if err != nil {
		http.Error(w, "Failed to marshal products", http.StatusInternalServerError)
		return
	}

	_, err = w.Write(b)
	if err != nil {
		http.Error(w, "Failed to write response", http.StatusInternalServerError)
		return
	}
}

// PurchaseHandler handles product purchases
func PurchaseHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var purchaseReq PurchaseRequest
	err := json.NewDecoder(r.Body).Decode(&purchaseReq)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Initialize database
	db, err := initDatabase()
	if err != nil {
		http.Error(w, "Database initialization failed", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// Process the purchase
	err = purchaseProducts(db, purchaseReq.ProductQuantityPurchased)
	if err != nil {
		response := PurchaseResponse{
			Success: false,
			Message: err.Error(),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	// Success response
	response := PurchaseResponse{
		Success: true,
		Message: "Purchase successful",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	fmt.Println("Starting server at port 8080. URL: http://localhost:8080/")
	http.HandleFunc("/products", Handler)
	http.HandleFunc("/purchase", PurchaseHandler)
	http.ListenAndServe(":8080", nil)
}
