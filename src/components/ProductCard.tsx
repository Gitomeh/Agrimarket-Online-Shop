import { useState } from 'react';
import { Product } from '../types';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductCard({ product, onAddToCart, isLoading }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = `https://placehold.co/400x300/22c55e/ffffff?text=${encodeURIComponent(product.name)}`;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative cursor-pointer">
          <img
            src={imageError ? fallbackImage : product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          {!product.available && (
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-lg text-gray-900 hover:text-green-600 cursor-pointer">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-600">{product.farmer}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">KSh {product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-600">/{product.unit}</span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.available || isLoading}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
