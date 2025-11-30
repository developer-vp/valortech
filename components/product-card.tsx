import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/products"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group border border-border rounded-lg overflow-hidden hover:shadow-lg transition">
      <Link href={`/product/${product.id}`} className="block overflow-hidden bg-muted aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  )
}
