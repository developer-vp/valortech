"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Header } from "@/components/header"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. A confirmation email has been sent to your email address with all the order
            details and tracking information.
          </p>

          <div className="bg-muted rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-2xl font-bold text-foreground">
              #{Math.random().toString(36).substring(2, 11).toUpperCase()}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              You can track your order status from your email or in your account dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition font-semibold"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="bg-muted text-foreground px-8 py-3 rounded-lg hover:bg-muted/70 transition font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
