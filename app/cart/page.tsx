"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { getCartItems, removeItem, updateQuantity, getTotalPrice } = useCart()
  const cartItems = getCartItems()
  const total = getTotalPrice()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some amazing products to get started!</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-4 border border-border rounded-lg">
                    {item.product && (
                      <>
                        <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </Link>

                        <div className="flex-1">
                          <Link
                            href={`/product/${item.productId}`}
                            className="text-lg font-semibold text-foreground hover:text-primary transition"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-muted-foreground mt-1">${item.product.price}</p>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-muted transition"
                              >
                                −
                              </button>
                              <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-muted transition"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-semibold text-foreground">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-muted rounded-lg p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-semibold text-center block"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="w-full mt-3 bg-muted text-foreground py-3 rounded-lg hover:bg-muted/70 transition font-semibold text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
