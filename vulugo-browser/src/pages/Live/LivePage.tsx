import React from 'react';
import { useNavigate } from 'react-router-dom';

const LivePage: React.FC = () => {
  const navigate = useNavigate();

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
            <h1 className="text-xl font-bold text-gray-800">Live</h1>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Go Live
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Streaming</h2>
          <p className="text-gray-600 mb-8">Connect with your audience in real-time!</p>
          
          <div className="card p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Demo Features</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Real-time video streaming</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Live chat with viewers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Gift and donation system</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Viewer interaction tools</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button className="btn-primary w-full max-w-md">
              Start Live Stream
            </button>
            <button onClick={() => navigate('/')} className="btn-outline w-full max-w-md">
              Back to Swiping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage; 