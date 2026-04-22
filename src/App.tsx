import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminFoods from './pages/admin/Foods';
import AdminOrders from './pages/admin/Orders';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { Toaster } from 'react-hot-toast';
import UINav from './pages/ui/UINav';
import UI1 from './pages/ui/UI1';
import UI2 from './pages/ui/UI2';
import UI3 from './pages/ui/UI3';
import UI4 from './pages/ui/UI4';
import PremiumDemo from './pages/ui/PremiumDemo';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';

// Scroll to top or section on route change/hash
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Toaster position="top-right" />
        <ScrollHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><UI3 /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/foods" element={<ProtectedAdminRoute><AdminFoods /></ProtectedAdminRoute>} />
          <Route path="/admin/orders" element={<ProtectedAdminRoute><AdminOrders /></ProtectedAdminRoute>} />

          {/* UI Sandbox Routes */}
          <Route path="/ui"  element={<UINav />} />
          <Route path="/ui1" element={<UI1 />} />
          <Route path="/ui2" element={<UI2 />} />
          <Route path="/ui3" element={<UI3 />} />
          <Route path="/ui4" element={<UI4 />} />
          <Route path="/premium" element={<PremiumDemo />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};




export default App;

