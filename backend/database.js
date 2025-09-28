// Database connection and utilities
const mysql = require("mysql2/promise")

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "asmae_shop",
  charset: "utf8mb4",
}

// Create connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Database utility functions
class Database {
  static async query(sql, params = []) {
    try {
      const [results] = await pool.execute(sql, params)
      return results
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  }

  // Products
  static async getAllProducts() {
    return await this.query("SELECT * FROM products ORDER BY is_featured DESC, created_at DESC")
  }

  static async getProductById(id) {
    const results = await this.query("SELECT * FROM products WHERE id = ?", [id])
    return results[0]
  }

  static async getFeaturedProducts() {
    return await this.query("SELECT * FROM products WHERE is_featured = TRUE ORDER BY created_at DESC")
  }

  // Orders
  static async createOrder(orderData) {
    const { customer_id, order_number, total_amount, delivery_fee, delivery_address, phone, notes } = orderData
    return await this.query(
      "INSERT INTO orders (customer_id, order_number, total_amount, delivery_fee, delivery_address, phone, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [customer_id, order_number, total_amount, delivery_fee, delivery_address, phone, notes],
    )
  }

  static async addOrderItem(order_id, product_id, quantity, price) {
    return await this.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [
      order_id,
      product_id,
      quantity,
      price,
    ])
  }

  static async getOrderByNumber(order_number) {
    const orderQuery = `
      SELECT o.*, c.first_name, c.last_name, c.email 
      FROM orders o 
      JOIN customers c ON o.customer_id = c.id 
      WHERE o.order_number = ?
    `
    const order = await this.query(orderQuery, [order_number])

    if (order.length > 0) {
      const itemsQuery = `
        SELECT oi.*, p.name_ar, p.name_en, p.image_url 
        FROM order_items oi 
        JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?
      `
      const items = await this.query(itemsQuery, [order[0].id])
      return { ...order[0], items }
    }
    return null
  }

  // Customers
  static async createCustomer(customerData) {
    const { first_name, last_name, email, phone, address, city } = customerData
    return await this.query(
      "INSERT INTO customers (first_name, last_name, email, phone, address, city) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, address, city],
    )
  }

  static async getCustomerByEmail(email) {
    const results = await this.query("SELECT * FROM customers WHERE email = ?", [email])
    return results[0]
  }

  // Wishlist
  static async addToWishlist(email, product_id) {
    return await this.query("INSERT IGNORE INTO wishlist (customer_email, product_id) VALUES (?, ?)", [
      email,
      product_id,
    ])
  }

  static async removeFromWishlist(email, product_id) {
    return await this.query("DELETE FROM wishlist WHERE customer_email = ? AND product_id = ?", [email, product_id])
  }

  static async getWishlist(email) {
    const query = `
      SELECT w.*, p.name_ar, p.name_en, p.price, p.image_url 
      FROM wishlist w 
      JOIN products p ON w.product_id = p.id 
      WHERE w.customer_email = ?
    `
    return await this.query(query, [email])
  }

  // Reviews
  static async getFeaturedReviews() {
    return await this.query("SELECT * FROM reviews WHERE is_featured = TRUE ORDER BY created_at DESC")
  }

  // Contact
  static async saveContactMessage(messageData) {
    const { name, email, phone, message } = messageData
    return await this.query("INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)", [
      name,
      email,
      phone,
      message,
    ])
  }
}

module.exports = Database
