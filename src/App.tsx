import { useState } from 'react';
import { Router, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider, useCart } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Farmers } from './pages/Farmers';
import { About } from './pages/About';
import { ProductDetail } from './pages/ProductDetail';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { CartSidebar } from './components/CartSidebar';
import './index.css';

const queryClient = new QueryClient();

function AppContent() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/farmers" component={Farmers} />
        <Route path="/about" component={About} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
