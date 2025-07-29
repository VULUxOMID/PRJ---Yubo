import React from 'react';

const LivePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Live</h1>
        <p className="text-gray-600 mb-8">Go live and connect with others!</p>
        <div className="card p-8">
          <p className="text-gray-500">Live streaming coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default LivePage; 