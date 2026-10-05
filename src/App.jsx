import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FoodModal } from './components/FoodModal';
import { SuccessOrderModal } from './components/SuccessOrderModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { MenuPage } from './pages/MenuPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ReviewSelectionPage } from './pages/ReviewSelectionPage';

// Customer Pages
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { CustomerRequestsPage } from './pages/CustomerRequestsPage';
import { CustomerProfilePage } from './pages/CustomerProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminRequestsPage } from './pages/AdminRequestsPage';
import { AdminFoodsPage } from './pages/AdminFoodsPage';
import { AdminCustomersPage } from './pages/AdminCustomersPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

export function App() {
  const [activePage, setActivePage] = useState('home');
  const [modalFood, setModalFood] = useState(null);
  const [successOrderData, setSuccessOrderData] = useState(null);

  const { isAuthenticated, isAdmin } = useAuth();

  const handleOpenFoodDetails = (food) => {
    setModalFood(food);
  };

  const handleOrderSuccess = (orderResponse) => {
    setSuccessOrderData(orderResponse);
  };

  const renderCurrentPage = () => {
    // Admin Protected Pages
    if (activePage.startsWith('admin-')) {
      if (!isAuthenticated || !isAdmin) {
        return <LoginPage setActivePage={setActivePage} />;
      }
      switch (activePage) {
        case 'admin-dashboard':
          return <AdminDashboardPage setActivePage={setActivePage} />;
        case 'admin-requests':
          return <AdminRequestsPage setActivePage={setActivePage} />;
        case 'admin-foods':
          return <AdminFoodsPage setActivePage={setActivePage} />;
        case 'admin-customers':
          return <AdminCustomersPage setActivePage={setActivePage} />;
        case 'admin-settings':
          return <AdminSettingsPage setActivePage={setActivePage} />;
        default:
          return <AdminDashboardPage setActivePage={setActivePage} />;
      }
    }

    // Customer Protected Pages
    if (activePage.startsWith('customer-')) {
      if (!isAuthenticated) {
        return <LoginPage setActivePage={setActivePage} />;
      }
      switch (activePage) {
        case 'customer-dashboard':
          return <CustomerDashboardPage setActivePage={setActivePage} onOpenFoodDetails={handleOpenFoodDetails} />;
        case 'customer-requests':
          return <CustomerRequestsPage setActivePage={setActivePage} />;
        case 'customer-profile':
          return <CustomerProfilePage setActivePage={setActivePage} />;
        default:
          return <CustomerDashboardPage setActivePage={setActivePage} onOpenFoodDetails={handleOpenFoodDetails} />;
      }
    }

    // Public Pages
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} onOpenFoodDetails={handleOpenFoodDetails} />;
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'services':
        return <ServicesPage setActivePage={setActivePage} />;
      case 'menu':
        return <MenuPage setActivePage={setActivePage} onOpenFoodDetails={handleOpenFoodDetails} />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'review-selection':
        return (
          <ReviewSelectionPage
            setActivePage={setActivePage}
            onOrderSuccess={handleOrderSuccess}
          />
        );
      default:
        return <HomePage setActivePage={setActivePage} onOpenFoodDetails={handleOpenFoodDetails} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 selection:bg-amber-500 selection:text-white">
      {/* Global Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Food Details Modal */}
      {modalFood && (
        <FoodModal
          food={modalFood}
          onClose={() => setModalFood(null)}
        />
      )}

      {/* Success Order Modal with Confetti & WhatsApp Links */}
      {successOrderData && (
        <SuccessOrderModal
          orderData={successOrderData}
          onClose={() => setSuccessOrderData(null)}
          onViewRequest={() => {
            setSuccessOrderData(null);
            setActivePage(isAdmin ? 'admin-requests' : 'customer-requests');
          }}
          onBackToMenu={() => {
            setSuccessOrderData(null);
            setActivePage('menu');
          }}
        />
      )}
    </div>
  );
}
export default App;
