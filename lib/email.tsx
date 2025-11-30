import nodemailer from "nodemailer"

// In production, replace with your actual email service credentials
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
  port: Number.parseInt(process.env.EMAIL_PORT || "2525"),
  auth: {
    user: process.env.EMAIL_USER || "dummy_user_key",
    pass: process.env.EMAIL_PASS || "dummy_password_key",
  },
})

export interface OrderDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
}

export async function sendOrderEmail(orderDetails: OrderDetails) {
  const { firstName, lastName, email, phone, address, city, zipCode, items, total } = orderDetails

  const itemsHTML = items
    .map(
      (item) =>
        `<tr>
      <td style="padding: 12px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`,
    )
    .join("")

  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Order Confirmation</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hi <strong>${firstName} ${lastName}</strong>,</p>
            <p>Thank you for your order! Here are the details of your purchase:</p>
            
            <h3 style="color: #667eea; margin-top: 20px;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #667eea;">Product</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #667eea;">Quantity</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #667eea;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div style="text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #667eea;">
              <h2 style="color: #667eea; margin: 0;">Total: $${total.toFixed(2)}</h2>
            </div>

            <h3 style="color: #667eea; margin-top: 20px;">Delivery Address</h3>
            <p>
              ${address}<br>
              ${city}, ${zipCode}<br>
              Phone: ${phone}
            </p>

            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                This is an automated email. Please do not reply to this message.
                If you have any questions about your order, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@ecommerce.local",
    to: email,
    subject: "Order Confirmation - Your Purchase Receipt",
    html: htmlContent,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
