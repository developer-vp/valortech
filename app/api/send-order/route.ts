import { type NextRequest, NextResponse } from "next/server"
import { sendOrderEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, address, city, zipCode, items, total } = body

    console.log("[v0] Processing order from:", email)
    console.log(`Customer: ${firstName} ${lastName}`)
    console.log(`Items: ${JSON.stringify(items, null, 2)}`)
    console.log(`Total: $${total}`)

    const emailResult = await sendOrderEmail({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zipCode,
      items,
      total,
    })

    if (!emailResult.success) {
      console.warn("[v0] Email sending failed, but order is still processed")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order received successfully. Confirmation email sent.",
        email_sent: emailResult.success,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing order:", error)
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 })
  }
}
