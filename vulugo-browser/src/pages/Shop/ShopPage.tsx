import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(1000);

  const shopItems = [
    {
      id: 1,
      name: 'Rose Bouquet',
      price: 100,
      icon: '🌹',
      description: 'Send a beautiful bouquet of roses',
    },
    {
      id: 2,
      name: 'Diamond Ring',
      price: 500,
      icon: '💍',
      description: 'Sparkle with this stunning ring',
    },
    {
      id: 3,
      name: 'Chocolate Box',
      price: 50,
      icon: '🍫',
      description: 'Sweet treats for your sweet',
    },
    {
      id: 4,
      name: 'Teddy Bear',
      price: 75,
      icon: '🧸',
      description: 'Cuddly companion for your match',
    },
    {
      id: 5,
      name: 'Champagne',
      price: 200,
      icon: '🍾',
      description: 'Celebrate your connection',
    },
    {
      id: 6,
      name: 'Super Like',
      price: 150,
      icon: '⭐',
      description: 'Stand out with a super like',
    },
  ];

  const handlePurchase = (item: any) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      // In a real app, this would send the gift to the match
      alert(`You sent ${item.name} to your match! 🎉`);
    } else {
      alert('Not enough coins! 💰');
    }
  };

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
            <h1 className="text-xl font-bold text-gray-800">Shop</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600 font-semibold">{coins}</span>
            <span className="text-yellow-600">🪙</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Balance Card */}
        <div className="card p-4 mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold">Your Balance</h2>
              <p className="text-white/80 text-sm">Send gifts to your matches</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{coins}</div>
              <div className="text-white/80 text-sm">Coins</div>
            </div>
          </div>
        </div>

        {/* Shop Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Gifts & Items</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {shopItems.map((item) => (
              <div key={item.id} className="card p-4 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-600 font-semibold">{item.price} 🪙</span>
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={coins < item.price}
                      className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Info */}
        <div className="card p-4 mt-6 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Demo Shop</h4>
              <p className="text-blue-700 text-sm">
                This is a demo version. In the full app, you can purchase coins and send real gifts to your matches!
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button onClick={() => navigate('/')} className="btn-primary w-full">
            Back to Swiping
          </button>
          <button className="btn-outline w-full">
            Buy More Coins
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage; 