import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { listenToAuthChanges } from './store/slices/authSlice';

// Components
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

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
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

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
              <ProtectedRoute>
                {profile ? <SwipePage /> : <ProfileSetupPage />}
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfileSetupPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/matches" 
            element={
              <ProtectedRoute>
                <MatchesPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/chat/:matchId?" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/live" 
            element={
              <ProtectedRoute>
                <LivePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/shop" 
            element={
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
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
