import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, Match, Message } from '../../types';

// Mock demo data
const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: 'user1',
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop'
    ],
    bio: 'Love traveling and meeting new people! 🌍✈️ Coffee addict and adventure seeker.',
    interests: ['travel', 'photography', 'coffee', 'hiking'],
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
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop'
    ],
    bio: 'Coffee addict and book lover 📚☕ Always up for a good conversation!',
    interests: ['reading', 'coffee', 'art', 'music'],
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
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop'
    ],
    bio: 'Fitness enthusiast and foodie 💪🍕 Let\'s grab a workout or try new restaurants!',
    interests: ['fitness', 'cooking', 'outdoors', 'travel'],
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
  {
    id: '4',
    userId: 'user4',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'
    ],
    bio: 'Tech geek and music lover 🎵💻 Always exploring new technologies and sounds.',
    interests: ['technology', 'music', 'gaming', 'coding'],
    age: 25,
    gender: 'male',
    lookingFor: 'all',
    ageRange: { min: 20, max: 28 },
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      country: 'USA',
    },
    distance: 20,
    isVerified: true,
    isPremium: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    userId: 'user5',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=600&fit=crop'
    ],
    bio: 'Artist and dreamer 🎨✨ Love creating and exploring the world through art.',
    interests: ['art', 'painting', 'museums', 'creative'],
    age: 22,
    gender: 'female',
    lookingFor: 'all',
    ageRange: { min: 20, max: 26 },
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      country: 'USA',
    },
    distance: 18,
    isVerified: false,
    isPremium: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

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
    users: ['currentUser', 'user3'],
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

const mockMessages: { [matchId: string]: Message[] } = {
  'match1': [
    {
      id: 'msg1',
      matchId: 'match1',
      senderId: 'user1',
      content: 'Hey! How are you doing? 😊',
      type: 'text',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 'msg2',
      matchId: 'match1',
      senderId: 'currentUser',
      content: 'I\'m doing great! How about you?',
      type: 'text',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
      id: 'msg3',
      matchId: 'match1',
      senderId: 'user1',
      content: 'Pretty good! Would you like to grab coffee sometime? ☕',
      type: 'text',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
    },
  ],
  'match2': [
    {
      id: 'msg4',
      matchId: 'match2',
      senderId: 'user3',
      content: 'Hey! Love your profile! 💪',
      type: 'text',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    {
      id: 'msg5',
      matchId: 'match2',
      senderId: 'currentUser',
      content: 'Thanks! Yours too! Are you into fitness?',
      type: 'text',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
    },
    {
      id: 'msg6',
      matchId: 'match2',
      senderId: 'user3',
      content: 'Yes! I love working out. Do you have a favorite gym? 🏋️‍♀️',
      type: 'text',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ],
};

interface DemoState {
  currentUser: {
    id: string;
    name: string;
    age: number;
    photos: string[];
    bio: string;
    interests: string[];
  };
  profiles: Profile[];
  matches: Match[];
  messages: { [matchId: string]: Message[] };
  currentProfileIndex: number;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: DemoState = {
  currentUser: {
    id: 'currentUser',
    name: 'Alex',
    age: 25,
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'],
    bio: 'Adventure seeker and coffee lover ☕️ Always up for trying new things!',
    interests: ['travel', 'coffee', 'photography', 'music'],
  },
  profiles: mockProfiles,
  matches: mockMatches,
  messages: mockMessages,
  currentProfileIndex: 0,
  isAuthenticated: true,
  isLoading: false,
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    swipeProfile: (state, action: PayloadAction<'like' | 'dislike' | 'superlike'>) => {
      const action_type = action.payload;
      // Simulate matching logic
      if (action_type === 'like' && state.currentProfileIndex < state.profiles.length) {
        const currentProfile = state.profiles[state.currentProfileIndex];
        // 50% chance of match for demo purposes
        if (Math.random() > 0.5) {
          const newMatch: Match = {
            id: `match_${Date.now()}`,
            users: ['currentUser', currentProfile.userId],
            createdAt: new Date(),
            unreadCount: 0,
          };
          state.matches.unshift(newMatch);
        }
      }
      state.currentProfileIndex += 1;
    },
    sendMessage: (state, action: PayloadAction<{ matchId: string; content: string }>) => {
      const { matchId, content } = action.payload;
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        matchId,
        senderId: 'currentUser',
        content,
        type: 'text',
        isRead: false,
        createdAt: new Date(),
      };
      
      if (!state.messages[matchId]) {
        state.messages[matchId] = [];
      }
      state.messages[matchId].push(newMessage);
      
      // Update match's last message
      const matchIndex = state.matches.findIndex(m => m.id === matchId);
      if (matchIndex !== -1) {
        state.matches[matchIndex].lastMessage = newMessage;
      }
    },
    markMessagesAsRead: (state, action: PayloadAction<string>) => {
      const matchId = action.payload;
      if (state.messages[matchId]) {
        state.messages[matchId].forEach(msg => {
          if (msg.senderId !== 'currentUser') {
            msg.isRead = true;
          }
        });
      }
      
      // Update unread count
      const matchIndex = state.matches.findIndex(m => m.id === matchId);
      if (matchIndex !== -1) {
        state.matches[matchIndex].unreadCount = 0;
      }
    },
    resetProfiles: (state) => {
      state.currentProfileIndex = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  swipeProfile, 
  sendMessage, 
  markMessagesAsRead, 
  resetProfiles, 
  setLoading 
} = demoSlice.actions;

export default demoSlice.reducer; 