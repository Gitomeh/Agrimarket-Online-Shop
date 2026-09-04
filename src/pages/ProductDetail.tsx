import { useState } from 'react';
import { useParams } from 'wouter';
import { mockProducts } from '../data/mockData';
import { MarketInsights } from '../components/MarketInsights';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const product = mockProducts.find(p => p.id === id);
  
  const fallbackImage = product ? `https://placehold.co/400x300/22c55e/ffffff?text=${encodeURIComponent(product.name)}` : '';

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <a href="/marketplace" className="text-green-600 hover:text-green-700 font-medium">
            Return to Marketplace
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a
          href="/marketplace"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={imageError ? fallbackImage : product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
              onError={() => setImageError(true)}
            />
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.farmer}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">KSh {product.price.toLocaleString()}</span>
              <span className="text-xl text-gray-600">/{product.unit}</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.available || isLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
              </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Availability:</dt>
                  <dd className={`font-medium ${product.available ? 'text-green-600' : 'text-red-600'}`}>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Farmer ID:</dt>
                  <dd className="font-medium">{product.farmerId}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <MarketInsights product={product} />
        </div>
      </div>
    </div>
  );
}
