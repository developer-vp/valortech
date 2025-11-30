"use client"

import { useCallback, useEffect, useState } from "react"
import {
  type Cart,
  addToCart as addToCartLib,
  removeFromCart,
  updateQuantity as updateQuantityLib,
  clearCart as clearCartLib,
} from "@/lib/cart"
import { getProductById } from "@/lib/products"

const CART_STORAGE_KEY = "ecommerce_cart"

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        setCart({ items: [] })
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addItem = useCallback((productId: string) => {
    setCart((prevCart) => addToCartLib(prevCart, productId))
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart((prevCart) => removeFromCart(prevCart, productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) => updateQuantityLib(prevCart, productId, quantity))
  }, [])

  const clearCart = useCallback(() => {
    setCart(clearCartLib())
  }, [])

  const getTotalPrice = useCallback(() => {
    return cart.items.reduce((total, item) => {
      const product = getProductById(item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }, [cart])

  const getCartItems = useCallback(() => {
    return cart.items.map((item) => ({
      ...item,
      product: getProductById(item.productId),
    }))
  }, [cart])

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartItems,
  }
}
