"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string | number;
  title: string;
  description: string;
  price: number;
  images: string[];
  brand?: string;
  availabilityStatus?: string;
  shippingInformation?: string;
  warrantyInformation?: string;
  stock?: number;
  reviews?: {
    rating: number;
    comment: string;
    reviewerName: string;
    date: string | Date;
  }[];
}

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(
      {
        id: Number(product.id),
        name: product.title,
        price: product.price,
        thumbnail: product.images[0],
        stock: product.stock ?? 1,
      },
      1
    );
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images && product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          )}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {product.images &&
              product.images
                .slice(1)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 2}`}
                    className="w-24 h-24 object-cover rounded-md cursor-pointer"
                  />
                ))}
          </div>
        </div>
        <div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-sky-950 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <div className="mb-4 text-gray-800">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Availability:</strong> {product.availabilityStatus}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p>
              <strong>Warranty:</strong> {product.warrantyInformation}
            </p>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          {showSuccess &&  (
            <div className="mt-2 text-green-600">
              Product added to cart successfully!
            </div>
          )}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-3">Customer Reviews</h3>
              {product.reviews.map((review: any, index: number) => (
                <div key={index} className="border-t pt-4 mt-4">
                  <p>
                    <strong>Rating:</strong> {review.rating} / 5
                  </p>
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                  <p className="text-sm text-gray-500">
                    - {review.reviewerName} (
                    {new Date(review.date).toLocaleDateString()})
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
