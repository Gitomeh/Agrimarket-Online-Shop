import { Link } from 'wouter';
import { mockProducts, mockFarmers } from '../data/mockData';
import { ArrowRight, Star, MapPin, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export function Home() {
  const featuredProducts = mockProducts.slice(0, 4);
  const featuredFarmers = mockFarmers.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fresh from Kenyan Farms
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
              Connect directly with local farmers across Kenya's 47 counties. 
              Get fresh, quality produce delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Marketplace
              </Link>
              <Link
                href="/farmers"
                className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-colors border-2 border-white"
              >
                <Users className="w-5 h-5" />
                Meet Our Farmers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-8 h-8 text-green-600" />
                <span className="text-4xl font-bold text-gray-900">500+</span>
              </div>
              <p className="text-gray-600">Kenyan Farmers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShoppingBag className="w-8 h-8 text-green-600" />
                <span className="text-4xl font-bold text-gray-900">10,000+</span>
              </div>
              <p className="text-gray-600">Products Available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-8 h-8 text-green-600" />
                <span className="text-4xl font-bold text-gray-900">47</span>
              </div>
              <p className="text-gray-600">Counties Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Farmers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Kenyan Farmers</h2>
              <p className="text-gray-600">Meet some of our top-rated farmers from across Kenya</p>
            </div>
            <Link
              href="/farmers"
              className="hidden md:flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              View All Farmers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFarmers.map(farmer => (
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
                      <Star className="w-3 h-3 fill-current" />
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
                    <Link
                      href="/farmers"
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/farmers"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              View All Farmers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Produce Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fresh Kenyan Produce</h2>
              <p className="text-gray-600">Discover the best seasonal produce from our farmers</p>
            </div>
            <Link
              href="/marketplace"
              className="hidden md:flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <article key={product.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/product/${product.id}`}>
                  <div className="relative cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-green-600 cursor-pointer mb-1">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">{product.farmer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">KSh {product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">/{product.unit}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Support Kenyan Farmers?</h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of Kenyans who are already getting fresh, quality produce directly from local farmers.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
}