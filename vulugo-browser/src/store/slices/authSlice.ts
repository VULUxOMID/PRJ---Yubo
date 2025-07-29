import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../../services/firebase';
import { User, AuthState } from '../../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, displayName }: { email: string; password: string; displayName: string }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }
);

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async () => {
    await signOut(auth);
  }
);

export const listenToAuthChanges = createAsyncThunk(
  'auth/listenToAuthChanges',
  async (_, { dispatch }) => {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
            lastSeen: new Date(),
            isOnline: true,
            age: 18, // Default age, will be updated from profile
            gender: 'other', // Default gender, will be updated from profile
            location: {
              latitude: 0,
              longitude: 0,
              city: '',
              country: '',
            },
          };
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
        resolve();
      });
      
      // Store unsubscribe function for cleanup
      return unsubscribe;
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
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
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      // Listen to auth changes
      .addCase(listenToAuthChanges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listenToAuthChanges.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser, clearUser, setLoading, setError, clearError } = authSlice.actions;
export default authSlice.reducer; 