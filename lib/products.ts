import type { StaticImageData } from "next/image"
import wirelessHeadphonesPro from "@/public/images/products/wireless-headphones-pro.jpg"
import usbcFastCharger from "@/public/images/products/usb-c-fast-charger.jpg"
import phoneScreenProtector from "@/public/images/products/phone-screen-protector.jpg"
import portablePowerBank from "@/public/images/products/portable-power-bank.jpg"
import cableOrganizerSet from "@/public/images/products/cable-organizer-set.jpg"
import bluetoothSpeakerMini from "@/public/images/products/bluetooth-speaker-mini.jpg"

export interface Product {
  id: string
  name: string
  price: number
  image: StaticImageData
  description: string
  category: string
  stock: number
  specs: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    price: 199.99,
    image: wirelessHeadphonesPro,
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    category: "Audio",
    stock: 15,
    specs: ["Noise Cancellation", "30h Battery", "Wireless Charging", "Premium Sound"],
  },
  {
    id: "2",
    name: "USB-C Fast Charger",
    price: 49.99,
    image: usbcFastCharger,
    description: "65W USB-C fast charger compatible with all devices.",
    category: "Chargers",
    stock: 45,
    specs: ["65W Power", "Fast Charging", "Multi-Device", "Compact Design"],
  },
  {
    id: "3",
    name: "Phone Screen Protector",
    price: 14.99,
    image: phoneScreenProtector,
    description: "Tempered glass screen protector with 9H hardness rating.",
    category: "Accessories",
    stock: 120,
    specs: ["9H Hardness", "Scratch Resistant", "Clear View", "Easy Install"],
  },
  {
    id: "4",
    name: "Portable Power Bank 30000mAh",
    price: 79.99,
    image: portablePowerBank,
    description: "High capacity power bank with fast charging support and LED display.",
    category: "Power Banks",
    stock: 32,
    specs: ["30000mAh", "Fast Charging", "LED Display", "Compact"],
  },
  {
    id: "5",
    name: "Cable Organizer Set",
    price: 24.99,
    image: cableOrganizerSet,
    description: "Premium cable organizer set to keep your workspace tidy.",
    category: "Accessories",
    stock: 89,
    specs: ["5 Pieces", "Silicone Material", "Reusable", "Color Coded"],
  },
  {
    id: "6",
    name: "Bluetooth Speaker Mini",
    price: 59.99,
    image: bluetoothSpeakerMini,
    description: "Compact Bluetooth speaker with 12-hour battery and waterproof design.",
    category: "Audio",
    stock: 28,
    specs: ["Waterproof", "12h Battery", "360° Sound", "Portable"],
  },
]

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category)
}

export const categories = Array.from(new Set(products.map((p) => p.category)))
