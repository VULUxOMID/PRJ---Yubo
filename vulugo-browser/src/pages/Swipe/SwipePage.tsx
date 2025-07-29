import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { swipeProfile, resetProfiles } from '../../store/slices/demoSlice';
import toast from 'react-hot-toast';

const SwipePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profiles, currentProfileIndex, matches } = useAppSelector((state: any) => state.demo);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (action: 'like' | 'dislike' | 'superlike') => {
    if (!currentProfile) return;

    dispatch(swipeProfile(action));
    
    // Show feedback
    if (action === 'like') {
      toast.success('Liked! 💕');
    } else if (action === 'dislike') {
      toast.error('Passed');
    } else {
      toast.success('Super Like! ⭐');
    }

    // Reset photo index for next profile
    setCurrentPhotoIndex(0);
  };

  const handlePhotoChange = (direction: 'next' | 'prev') => {
    if (!currentProfile) return;
    
    if (direction === 'next') {
      setCurrentPhotoIndex((prev) => 
        prev < currentProfile.photos.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentPhotoIndex((prev) => 
        prev > 0 ? prev - 1 : currentProfile.photos.length - 1
      );
    }
  };

  const handleReset = () => {
    dispatch(resetProfiles());
    setCurrentPhotoIndex(0);
    toast.success('Profiles reset!');
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No More Profiles</h1>
          <p className="text-gray-600 mb-8">You've seen all the profiles in this demo!</p>
          <div className="space-y-4">
            <button onClick={handleReset} className="btn-primary">
              Reset Profiles
            </button>
            <div className="flex justify-center space-x-4">
              <button className="btn-secondary">
                View Matches ({matches.length})
              </button>
              <button className="btn-outline">
                Open Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Swipe Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Photo */}
            <div className="relative h-96 bg-gray-200">
              <img
                src={currentProfile.photos[currentPhotoIndex]}
                alt={`${currentProfile.bio} - Photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Photo Navigation */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <button
                  onClick={() => handlePhotoChange('prev')}
                  className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => handlePhotoChange('next')}
                  className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Photo Indicators */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                {currentProfile.photos.map((_: string, index: number) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-white text-xl font-bold">
                    {currentProfile.bio.split(' ')[0]}, {currentProfile.age}
                  </h2>
                  {currentProfile.isVerified && (
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {currentProfile.isPremium && (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </div>
                <p className="text-white/90 text-sm line-clamp-2">{currentProfile.bio}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest: string) => (
                  <span
                    key={interest}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200 px-4 py-6">
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={() => handleSwipe('dislike')}
            className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors"
          >
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={() => handleSwipe('superlike')}
            className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>

          <button
            onClick={() => handleSwipe('like')}
            className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipePage; 