"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const { cart } = useCart()
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-semibold text-xl text-primary hover:text-primary/80 transition">
            TechHub
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition">
              Shop
            </Link>
          </nav>

          <Link href="/cart" className="relative p-2 hover:bg-muted rounded-lg transition">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
