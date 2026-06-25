import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AdminRostov from './pages/AdminRostov';
import AdminMariupol from './pages/AdminMariupol';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import LoginModal from './components/LoginModal';

function App() {
  const { user } = useStore();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header onLoginClick={() => setShowLogin(true)} />
        
        <main className="layout animate-fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-rostov" element={user?.role === 'admin_rostov' ? <AdminRostov /> : <Navigate to="/" />} />
            <Route path="/admin-mariupol" element={user?.role === 'admin_mariupol' ? <AdminMariupol /> : <Navigate to="/" />} />
          </Routes>
        </main>

        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
