import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile, SwipeState } from '../../types';

const initialState: SwipeState = {
  currentProfiles: [],
  isLoading: false,
  error: null,
};

// Async thunks for swipe operations
export const fetchProfilesToSwipe = createAsyncThunk(
  'swipe/fetchProfilesToSwipe',
  async (userId: string) => {
    // TODO: Implement Firebase Firestore profile fetching with filters
    // This should fetch profiles based on user preferences and location
    const mockProfiles: Profile[] = [
      {
        id: '1',
        userId: 'user1',
        photos: ['https://via.placeholder.com/400x600/FF6B6B/FFFFFF?text=Profile+1'],
        bio: 'Love traveling and meeting new people! 🌍✈️',
        interests: ['travel', 'photography', 'music'],
        age: 24,
        gender: 'female',
        lookingFor: 'all',
        ageRange: { min: 20, max: 30 },
        location: {
          latitude: 40.7128,
          longitude: -74.0060,
          city: 'New York',
          country: 'USA',
        },
        distance: 25,
        isVerified: true,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: 'user2',
        photos: ['https://via.placeholder.com/400x600/4ECDC4/FFFFFF?text=Profile+2'],
        bio: 'Coffee addict and book lover 📚☕',
        interests: ['reading', 'coffee', 'art'],
        age: 26,
        gender: 'male',
        lookingFor: 'female',
        ageRange: { min: 22, max: 28 },
        location: {
          latitude: 40.7128,
          longitude: -74.0060,
          city: 'New York',
          country: 'USA',
        },
        distance: 15,
        isVerified: false,
        isPremium: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        userId: 'user3',
        photos: ['https://via.placeholder.com/400x600/45B7D1/FFFFFF?text=Profile+3'],
        bio: 'Fitness enthusiast and foodie 💪🍕',
        interests: ['fitness', 'cooking', 'outdoors'],
        age: 23,
        gender: 'female',
        lookingFor: 'all',
        ageRange: { min: 21, max: 29 },
        location: {
          latitude: 40.7128,
          longitude: -74.0060,
          city: 'New York',
          country: 'USA',
        },
        distance: 30,
        isVerified: true,
        isPremium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return mockProfiles;
  }
);

export const performSwipe = createAsyncThunk(
  'swipe/performSwipe',
  async ({ swiperId, targetId, action }: { swiperId: string; targetId: string; action: 'like' | 'dislike' | 'superlike' }) => {
    // TODO: Implement Firebase Firestore swipe recording
    return { swiperId, targetId, action };
  }
);

const swipeSlice = createSlice({
  name: 'swipe',
  initialState,
  reducers: {
    setCurrentProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.currentProfiles = action.payload;
    },
    removeProfileFromStack: (state, action: PayloadAction<string>) => {
      state.currentProfiles = state.currentProfiles.filter(profile => profile.id !== action.payload);
    },
    addProfilesToStack: (state, action: PayloadAction<Profile[]>) => {
      state.currentProfiles = [...state.currentProfiles, ...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profiles
      .addCase(fetchProfilesToSwipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfilesToSwipe.fulfilled, (state, action) => {
        state.currentProfiles = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfilesToSwipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profiles';
      })
      // Perform Swipe
      .addCase(performSwipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(performSwipe.fulfilled, (state, action) => {
        // Remove the swiped profile from the stack
        state.currentProfiles = state.currentProfiles.filter(
          profile => profile.id !== action.payload.targetId
        );
        state.isLoading = false;
      })
      .addCase(performSwipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to perform swipe';
      });
  },
});

export const { 
  setCurrentProfiles, 
  removeProfileFromStack, 
  addProfilesToStack, 
  setLoading, 
  setError, 
  clearError 
} = swipeSlice.actions;

export default swipeSlice.reducer; 