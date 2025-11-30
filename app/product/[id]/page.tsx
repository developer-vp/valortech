"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"
import { Header } from "@/components/header"
import { getProductById } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary hover:text-primary/80 transition">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product.id)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-muted rounded-lg overflow-hidden aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mb-6">${product.price}</p>
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            {/* Specs */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-3">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-accent" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-muted transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 font-semibold rounded-lg transition ${
                  addedToCart ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {addedToCart ? "Added to cart!" : "Add to cart"}
              </button>
            </div>

            {/* Stock Info */}
            <p className="text-sm text-muted-foreground mt-6">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
