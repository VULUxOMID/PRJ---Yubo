import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Match, MatchState } from '../../types';

const initialState: MatchState = {
  matches: [],
  isLoading: false,
  error: null,
};

// Async thunks for match operations
export const fetchMatches = createAsyncThunk(
  'match/fetchMatches',
  async (userId: string) => {
    // TODO: Implement Firebase Firestore match fetching
    const mockMatches: Match[] = [
      {
        id: 'match1',
        users: ['currentUser', 'user1'],
        createdAt: new Date(),
        lastMessage: {
          id: 'msg1',
          matchId: 'match1',
          senderId: 'user1',
          content: 'Hey! How are you doing? 😊',
          type: 'text',
          isRead: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        },
        unreadCount: 1,
      },
      {
        id: 'match2',
        users: ['currentUser', 'user2'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        lastMessage: {
          id: 'msg2',
          matchId: 'match2',
          senderId: 'currentUser',
          content: 'Thanks for the match!',
          type: 'text',
          isRead: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        unreadCount: 0,
      },
    ];
    return mockMatches;
  }
);

export const createMatch = createAsyncThunk(
  'match/createMatch',
  async ({ userId1, userId2 }: { userId1: string; userId2: string }) => {
    // TODO: Implement Firebase Firestore match creation
    const newMatch: Match = {
      id: `match_${Date.now()}`,
      users: [userId1, userId2],
      createdAt: new Date(),
      unreadCount: 0,
    };
    return newMatch;
  }
);

export const unmatch = createAsyncThunk(
  'match/unmatch',
  async (matchId: string) => {
    // TODO: Implement Firebase Firestore unmatch
    return matchId;
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
    addMatch: (state, action: PayloadAction<Match>) => {
      state.matches.unshift(action.payload);
    },
    removeMatch: (state, action: PayloadAction<string>) => {
      state.matches = state.matches.filter(match => match.id !== action.payload);
    },
    updateMatch: (state, action: PayloadAction<{ matchId: string; updates: Partial<Match> }>) => {
      const { matchId, updates } = action.payload;
      const matchIndex = state.matches.findIndex(match => match.id === matchId);
      if (matchIndex !== -1) {
        state.matches[matchIndex] = { ...state.matches[matchIndex], ...updates };
      }
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
      // Fetch Matches
      .addCase(fetchMatches.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.matches = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch matches';
      })
      // Create Match
      .addCase(createMatch.fulfilled, (state, action) => {
        state.matches.unshift(action.payload);
      })
      // Unmatch
      .addCase(unmatch.fulfilled, (state, action) => {
        state.matches = state.matches.filter(match => match.id !== action.payload);
      });
  },
});

export const { 
  setMatches, 
  addMatch, 
  removeMatch, 
  updateMatch, 
  setLoading, 
  setError, 
  clearError 
} = matchSlice.actions;

export default matchSlice.reducer; 