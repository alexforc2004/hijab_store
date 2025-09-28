// Order management API endpoints
const Database = require("../database")

class OrderAPI {
  // Create new order
  static async createOrder(req, res) {
    try {
      const { customerInfo, items, subtotal, deliveryFee, discount, total } = req.body

      // Create or get customer
      let customer = await Database.getCustomerByEmail(customerInfo.email)
      if (!customer) {
        const customerResult = await Database.createCustomer({
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          city: customerInfo.city,
        })
        customer = { id: customerResult.insertId, ...customerInfo }
      }

      // Generate order number
      const orderNumber = `ASM${Date.now().toString().slice(-6)}`

      // Create order
      const orderResult = await Database.createOrder({
        customer_id: customer.id,
        order_number: orderNumber,
        total_amount: total,
        delivery_fee: deliveryFee,
        delivery_address: customerInfo.address,
        phone: customerInfo.phone,
        notes: customerInfo.notes || "",
      })

      // Add order items
      for (const item of items) {
        await Database.addOrderItem(orderResult.insertId, item.id, item.quantity, item.price)
      }

      res.json({
        success: true,
        orderNumber,
        message: "تم إنشاء الطلب بنجاح",
      })
    } catch (error) {
      console.error("Error creating order:", error)
      res.status(500).json({
        success: false,
        message: "حدث خطأ في إنشاء الطلب",
      })
    }
  }

  // Get order by number and email
  static async getOrder(req, res) {
    try {
      const { orderNumber, email } = req.query

      const order = await Database.getOrderByNumber(orderNumber)

      if (!order || order.email !== email) {
        return res.status(404).json({
          success: false,
          message: "لم يتم العثور على الطلب",
        })
      }

      res.json({
        success: true,
        order,
      })
    } catch (error) {
      console.error("Error fetching order:", error)
      res.status(500).json({
        success: false,
        message: "حدث خطأ في جلب الطلب",
      })
    }
  }

  // Update order status (admin only)
  static async updateOrderStatus(req, res) {
    try {
      const { orderNumber, status } = req.body

      await Database.query("UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_number = ?", [
        status,
        orderNumber,
      ])

      res.json({
        success: true,
        message: "تم تحديث حالة الطلب",
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      res.status(500).json({
        success: false,
        message: "حدث خطأ في تحديث الطلب",
      })
    }
  }
}

module.exports = OrderAPI
