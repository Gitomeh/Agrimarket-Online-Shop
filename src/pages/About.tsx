import { Leaf, Heart, Truck } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About AgriMarket Kenya</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting Kenyan communities with fresh, locally-grown produce while supporting sustainable farming practices across the 47 counties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fresh & Kenyan</h3>
            <p className="text-gray-600 text-sm">
              All produce is sourced from Kenyan farms across our 47 counties, ensuring maximum freshness and supporting local agriculture.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Support Farmers</h3>
            <p className="text-gray-600 text-sm">
              We ensure fair prices for farmers, helping sustain local agriculture and rural communities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Convenient Delivery</h3>
            <p className="text-gray-600 text-sm">
              Get fresh produce delivered straight to your door with flexible delivery options and real-time tracking.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600 mb-4">
            AgriMarket Kenya was founded with a simple mission: to make fresh, Kenyan-grown produce accessible to everyone while supporting the farmers who grow it. We believe that knowing where your food comes from matters, and that the best food is grown with care by Kenyan farmers you can trust.
          </p>
          <p className="text-gray-600 mb-4">
            By connecting consumers directly with Kenyan farmers, we cut out the middleman, reduce food miles, and ensure that farmers receive fair compensation for their hard work. This creates a more sustainable food system that benefits everyone - from the farmers in Nyeri, Nakuru, and across all 47 counties to the families who enjoy their produce.
          </p>
          <p className="text-gray-600">
            Join us in building a healthier, more sustainable Kenyan food system, one purchase at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
