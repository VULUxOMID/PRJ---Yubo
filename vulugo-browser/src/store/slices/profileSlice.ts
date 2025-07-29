import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../../types';

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

// Async thunks for profile operations
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData: Partial<Profile>) => {
    // TODO: Implement Firebase Firestore profile creation
    const newProfile: Profile = {
      id: '',
      userId: '',
      photos: [],
      bio: '',
      interests: [],
      age: 18,
      gender: 'other',
      lookingFor: 'all',
      ageRange: { min: 18, max: 100 },
      location: {
        latitude: 0,
        longitude: 0,
        city: '',
        country: '',
      },
      distance: 50,
      isVerified: false,
      isPremium: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...profileData,
    };
    return newProfile;
  }
);

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string) => {
    // TODO: Implement Firebase Firestore profile fetching
    return null;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: Partial<Profile>) => {
    // TODO: Implement Firebase Firestore profile update
    return profileData;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
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
      // Create Profile
      .addCase(createProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create profile';
      })
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload, updatedAt: new Date() };
        }
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export const { setProfile, clearProfile, setLoading, setError, clearError } = profileSlice.actions;
export default profileSlice.reducer; 