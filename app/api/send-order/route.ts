import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, address, city, zipCode, items, total } = body

    // Log the order (in production, replace with email service like Resend, SendGrid, etc.)
    console.log("New Order Received:")
    console.log(`Customer: ${firstName} ${lastName}`)
    console.log(`Email: ${email}`)
    console.log(`Phone: ${phone}`)
    console.log(`Address: ${address}, ${city} ${zipCode}`)
    console.log(`Items: ${JSON.stringify(items, null, 2)}`)
    console.log(`Total: $${total}`)

    // In production, you would send an email here using a service like:
    // - Resend (easiest for Vercel): import { Resend } from 'resend';
    // - SendGrid: const sgMail = require('@sendgrid/mail');
    // - AWS SES: import { SESClient } from "@aws-sdk/client-ses";

    // For now, we'll return success
    return NextResponse.json(
      {
        success: true,
        message: "Order received successfully. Check the console for order details.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 })
  }
}
