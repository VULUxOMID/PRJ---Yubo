import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state: any) => state.demo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/')} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Profile</h1>
          </div>
          <button className="text-primary-500 font-medium">Edit</button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4">
        <div className="card p-6 mb-6">
          {/* Profile Photo */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <button className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{currentUser.name}, {currentUser.age}</h2>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600">{currentUser.bio}</p>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.interests.map((interest: string) => (
                <span
                  key={interest}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Notifications</h4>
                <p className="text-sm text-gray-600">Get notified about new matches</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="w-10 h-6 bg-primary-500 rounded-full"></div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Location Services</h4>
                <p className="text-sm text-gray-600">Show your location to others</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="w-10 h-6 bg-primary-500 rounded-full"></div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Info */}
        <div className="card p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Demo Mode</h3>
              <p className="text-blue-700 text-sm">
                This is a demo version of VuluGO. In the full app, you would be able to edit your profile, 
                add more photos, and customize your settings. All data shown is mock data for demonstration purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button onClick={() => navigate('/')} className="btn-primary w-full">
            Back to Swiping
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('vulugo-demo-auth');
              window.location.reload();
            }} 
            className="btn-outline w-full"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage; 