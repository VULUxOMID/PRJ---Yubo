// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastSeen: Date;
  isOnline: boolean;
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
}

// Profile Types
export interface Profile {
  id: string;
  userId: string;
  photos: string[];
  bio: string;
  interests: string[];
  age: number;
  gender: 'male' | 'female' | 'non-binary' | 'other';
  lookingFor: 'male' | 'female' | 'non-binary' | 'other' | 'all';
  ageRange: {
    min: number;
    max: number;
  };
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  distance: number; // in kilometers
  isVerified: boolean;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Match Types
export interface Match {
  id: string;
  users: string[]; // Array of user IDs
  createdAt: Date;
  lastMessage?: Message;
  unreadCount: number;
}

// Message Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'gif' | 'sticker';
  mediaUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

// Swipe Types
export interface Swipe {
  id: string;
  swiperId: string;
  targetId: string;
  action: 'like' | 'dislike' | 'superlike';
  createdAt: Date;
}

// Live Stream Types
export interface LiveStream {
  id: string;
  hostId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  isLive: boolean;
  viewerCount: number;
  startedAt: Date;
  endedAt?: Date;
  gifts: Gift[];
}

// Gift Types
export interface Gift {
  id: string;
  name: string;
  icon: string;
  price: number; // in coins
  animation?: string;
}

// Shop Types
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'coins' | 'gems' | 'real';
  type: 'coins' | 'gems' | 'premium' | 'feature';
  icon: string;
  isPopular?: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'like' | 'superlike' | 'live' | 'gift';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// App State Types
export interface AppState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Swipe State Types
export interface SwipeState {
  currentProfiles: Profile[];
  isLoading: boolean;
  error: string | null;
}

// Match State Types
export interface MatchState {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
}

// Chat State Types
export interface ChatState {
  activeChat: string | null;
  messages: { [matchId: string]: Message[] };
  isLoading: boolean;
  error: string | null;
} 