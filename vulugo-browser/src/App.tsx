import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const AppContent: React.FC = () => {
  // For demo purposes, we'll start with authentication
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Simulate authentication check
  React.useEffect(() => {
    const authStatus = localStorage.getItem('vulugo-demo-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for authentication changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      const authStatus = localStorage.getItem('vulugo-demo-auth');
      setIsAuthenticated(authStatus === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? <SwipePage /> : <Navigate to="/auth" replace />
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? <ProfileSetupPage /> : <Navigate to="/auth" replace />
            } 
          />
          
          <Route 
            path="/matches" 
            element={
              isAuthenticated ? <MatchesPage /> : <Navigate to="/auth" replace />
            } 
          />
          
          <Route 
            path="/chat/:matchId?" 
            element={
              isAuthenticated ? <ChatPage /> : <Navigate to="/auth" replace />
            } 
          />
          
          <Route 
            path="/live" 
            element={
              isAuthenticated ? <LivePage /> : <Navigate to="/auth" replace />
            } 
          />
          
          <Route 
            path="/shop" 
            element={
              isAuthenticated ? <ShopPage /> : <Navigate to="/auth" replace />
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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
    </Router>
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
