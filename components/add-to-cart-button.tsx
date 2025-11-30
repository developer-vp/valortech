"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface AddToCartButtonProps {
  productId: string
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem(productId)}
      className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
      title="Add to cart"
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  )
}
