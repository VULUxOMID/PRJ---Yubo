import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';

// Pages
import AuthPage from './pages/Auth/AuthPage';
import ProfileSetupPage from './pages/Profile/ProfileSetupPage';
import SwipePage from './pages/Swipe/SwipePage';
import MatchesPage from './pages/Matches/MatchesPage';
import ChatPage from './pages/Chat/ChatPage';
import LivePage from './pages/Live/LivePage';
import ShopPage from './pages/Shop/ShopPage';

// Styles
import './index.css';

type Page = 'auth' | 'swipe' | 'profile' | 'matches' | 'chat' | 'live' | 'shop';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate authentication check
  React.useEffect(() => {
    const authStatus = localStorage.getItem('vulugo-demo-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setCurrentPage('swipe');
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('vulugo-demo-auth', 'true');
    setIsAuthenticated(true);
    setCurrentPage('swipe');
  };

  const handleLogout = () => {
    localStorage.removeItem('vulugo-demo-auth');
    setIsAuthenticated(false);
    setCurrentPage('auth');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="App min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">VuluGO</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateTo('swipe')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'swipe' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Swipe
            </button>
            <button 
              onClick={() => navigateTo('matches')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'matches' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Matches
            </button>
            <button 
              onClick={() => navigateTo('profile')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'profile' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Profile
            </button>
            <button 
              onClick={() => navigateTo('live')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'live' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Live
            </button>
            <button 
              onClick={() => navigateTo('shop')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'shop' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              Shop
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 text-sm px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-hidden">
        {currentPage === 'swipe' && <SwipePage />}
        {currentPage === 'matches' && <MatchesPage />}
        {currentPage === 'profile' && <ProfileSetupPage />}
        {currentPage === 'chat' && <ChatPage />}
        {currentPage === 'live' && <LivePage />}
        {currentPage === 'shop' && <ShopPage />}
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ECDC4',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#FF6B6B',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
