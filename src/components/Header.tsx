import { ShoppingCart, Search, User, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const { isAdmin, logout } = useAdmin();

  const handleUserClick = () => {
    if (isAdmin) {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/admin/login';
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-green-600">AgriMarket</h1>
          
          <nav className="hidden md:flex gap-6 flex-1 justify-center">
            <a href="/" className="text-green-600 hover:text-green-700 transition-colors font-bold text-center">
              Home
            </a>
            <a href="/marketplace" className="text-green-600 hover:text-green-700 transition-colors font-bold text-center">
              Marketplace
            </a>
            <a href="/farmers" className="text-green-600 hover:text-green-700 transition-colors font-bold text-center">
              Farmers
            </a>
            <a href="/about" className="text-green-600 hover:text-green-700 transition-colors font-bold text-center">
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleUserClick}
                className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                aria-label={isAdmin ? "Admin dashboard" : "Admin login"}
                title={isAdmin ? "Admin Dashboard" : "Admin Login"}
              >
                <User className="w-6 h-6" />
              </button>
              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 hover:text-red-700 transition-colors"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
