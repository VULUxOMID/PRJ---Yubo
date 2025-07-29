import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';

// Components
import LoadingSpinner from './components/common/LoadingSpinner';

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
    <div className="App min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">VuluGO</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateTo('swipe')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'swipe' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Swipe
            </button>
            <button 
              onClick={() => navigateTo('matches')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'matches' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Matches
            </button>
            <button 
              onClick={() => navigateTo('profile')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'profile' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile
            </button>
            <button 
              onClick={() => navigateTo('live')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'live' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Live
            </button>
            <button 
              onClick={() => navigateTo('shop')}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'shop' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Shop
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1">
        {currentPage === 'swipe' && <div><SwipePage /></div>}
        {currentPage === 'matches' && <div><MatchesPage /></div>}
        {currentPage === 'profile' && <div><ProfileSetupPage /></div>}
        {currentPage === 'chat' && <div><ChatPage /></div>}
        {currentPage === 'live' && <div><LivePage /></div>}
        {currentPage === 'shop' && <div><ShopPage /></div>}
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
