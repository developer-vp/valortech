export interface CartItem {
  productId: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
}

export function addToCart(cart: Cart, productId: string): Cart {
  const existingItem = cart.items.find((item) => item.productId === productId)
  if (existingItem) {
    return {
      items: cart.items.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    }
  }
  return {
    items: [...cart.items, { productId, quantity: 1 }],
  }
}

export function removeFromCart(cart: Cart, productId: string): Cart {
  return {
    items: cart.items.filter((item) => item.productId !== productId),
  }
}

export function updateQuantity(cart: Cart, productId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId)
  }
  return {
    items: cart.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
  }
}

export function clearCart(): Cart {
  return { items: [] }
}
