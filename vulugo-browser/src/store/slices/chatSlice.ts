import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Message, ChatState } from '../../types';

const initialState: ChatState = {
  activeChat: null,
  messages: {},
  isLoading: false,
  error: null,
};

// Async thunks for chat operations
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (matchId: string) => {
    // TODO: Implement Firebase Firestore message fetching
    const mockMessages: Message[] = [
      {
        id: 'msg1',
        matchId,
        senderId: 'user1',
        content: 'Hey! How are you doing? 😊',
        type: 'text',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: 'msg2',
        matchId,
        senderId: 'currentUser',
        content: 'I\'m doing great! How about you?',
        type: 'text',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      },
      {
        id: 'msg3',
        matchId,
        senderId: 'user1',
        content: 'Pretty good! Would you like to grab coffee sometime? ☕',
        type: 'text',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      },
    ];
    return { matchId, messages: mockMessages };
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ matchId, content, type = 'text' }: { matchId: string; content: string; type?: 'text' | 'image' | 'gif' | 'sticker' }) => {
    // TODO: Implement Firebase Firestore message sending
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId: 'currentUser',
      content,
      type,
      isRead: false,
      createdAt: new Date(),
    };
    return { matchId, message: newMessage };
  }
);

export const markMessagesAsRead = createAsyncThunk(
  'chat/markMessagesAsRead',
  async ({ matchId, messageIds }: { matchId: string; messageIds: string[] }) => {
    // TODO: Implement Firebase Firestore message read status update
    return { matchId, messageIds };
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ matchId: string; message: Message }>) => {
      const { matchId, message } = action.payload;
      if (!state.messages[matchId]) {
        state.messages[matchId] = [];
      }
      state.messages[matchId].push(message);
    },
    updateMessage: (state, action: PayloadAction<{ matchId: string; messageId: string; updates: Partial<Message> }>) => {
      const { matchId, messageId, updates } = action.payload;
      if (state.messages[matchId]) {
        const messageIndex = state.messages[matchId].findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          state.messages[matchId][messageIndex] = { ...state.messages[matchId][messageIndex], ...updates };
        }
      }
    },
    removeMessage: (state, action: PayloadAction<{ matchId: string; messageId: string }>) => {
      const { matchId, messageId } = action.payload;
      if (state.messages[matchId]) {
        state.messages[matchId] = state.messages[matchId].filter(msg => msg.id !== messageId);
      }
    },
    clearChat: (state, action: PayloadAction<string>) => {
      const matchId = action.payload;
      state.messages[matchId] = [];
      if (state.activeChat === matchId) {
        state.activeChat = null;
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
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { matchId, messages } = action.payload;
        state.messages[matchId] = messages;
        state.isLoading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch messages';
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { matchId, message } = action.payload;
        if (!state.messages[matchId]) {
          state.messages[matchId] = [];
        }
        state.messages[matchId].push(message);
      })
      // Mark Messages as Read
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        const { matchId, messageIds } = action.payload;
        if (state.messages[matchId]) {
          state.messages[matchId] = state.messages[matchId].map(msg => 
            messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
          );
        }
      });
  },
});

export const { 
  setActiveChat, 
  addMessage, 
  updateMessage, 
  removeMessage, 
  clearChat, 
  setLoading, 
  setError, 
  clearError 
} = chatSlice.actions;

export default chatSlice.reducer; 