# Use Go with Alpine Linux for smaller image size
FROM golang:1.21-alpine AS builder

# Install build dependencies for SQLite
RUN apk add --no-cache gcc musl-dev sqlite-dev

# Set working directory
WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application with CGO enabled for SQLite
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o server products.go

# Use Alpine Linux for the final image
FROM alpine:latest

# Install SQLite runtime
RUN apk --no-cache add sqlite

# Set working directory
WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/server .

# Create directory for SQLite database
RUN mkdir -p /app/data

# Expose port
EXPOSE 8080

# Run the server
CMD ["./server"]
