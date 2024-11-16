package main

import (
	"net/http"
	"os"
	"path/filepath"
	"log"
)

func main() {
	root := "./" // Serve files from the current directory

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path

		// Serve index.html for root path
		if path == "/" {
			http.ServeFile(w, r, filepath.Join(root, "index.html"))
			return
		}

		// Check if the requested file exists
		filePath := filepath.Join(root, path)
		if _, err := os.Stat(filePath); err == nil {
			http.ServeFile(w, r, filePath)
			return
		}

		// Attempt to serve /html/$uri.html if the requested file is not found
		htmlPath := filepath.Join(root, "html", path+".html")
		if _, err := os.Stat(htmlPath); err == nil {
			http.ServeFile(w, r, htmlPath)
			return
		}

		// Return 404 if neither file exists
		http.NotFound(w, r)
	})

	// Start the server on port 8080
	log.Println("Serving on http://localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}

