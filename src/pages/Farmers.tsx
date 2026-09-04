import { mockFarmers } from '../data/mockData';
import { Star, MapPin, CheckCircle } from 'lucide-react';

export function Farmers() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Kenyan Farmers</h2>
          <p className="text-gray-600">Meet the dedicated Kenyan farmers who grow your food with care and passion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFarmers.map(farmer => (
            <article key={farmer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                {farmer.verified && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{farmer.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{farmer.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{farmer.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{farmer.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{farmer.products} products</span>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    View Products
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
