package main

import (
	"encoding/json"
	"net/http"
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

func Handler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Only allow GET requests
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Simple test products
	products := []*Product{
		{
			ID:       "SHOP-0011",
			Name:     "Milk",
			Price:    10,
			Stock:    20,
			ImageURL: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
		},
		{
			ID:       "SHOP-0012",
			Name:     "Soda",
			Price:    11,
			Stock:    5,
			ImageURL: "https://img-4.linternaute.com/mKXTbLlU0h1MoT6HRZy_FDyK7CI=/900x/smart/a8506dcf71b64b78bb5a66c7ce9cc05c/ccmcms-linternaute/13497750.jpg",
		},
	}

	response := ProductsResponse{Products: products}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
