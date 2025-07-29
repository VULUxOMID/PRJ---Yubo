# VuluGO Browser App

A modern browser-based social discovery app similar to Yubo, built with React, TypeScript, and Firebase.

## 🚀 Features

- **Authentication**: Email/password and social login
- **Profile Management**: Photo upload, bio, interests, preferences
- **Swipe Interface**: Card-based swiping with smooth animations
- **Matching System**: Mutual match detection and notifications
- **Real-time Chat**: Instant messaging with typing indicators
- **Live Streaming**: WebRTC-based video streaming
- **Virtual Shop**: Coins, gems, and premium features
- **Mobile Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS + Headless UI
- **Routing**: React Router v6
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Real-time**: Socket.io
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VULUxOMID/PRJ---Yubo.git
   cd vulugo-browser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase config to `.env.local`:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── profile/        # Profile management
│   ├── swipe/          # Swipe interface
│   ├── chat/           # Chat components
│   ├── live/           # Live streaming
│   ├── shop/           # Shop interface
│   └── common/         # Shared components
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Profile/        # Profile setup/editing
│   ├── Swipe/          # Main swipe interface
│   ├── Matches/        # Matches list
│   ├── Chat/           # Chat interface
│   ├── Live/           # Live streaming
│   └── Shop/           # Virtual shop
├── store/              # Redux store
│   └── slices/         # Redux slices
├── services/           # API services
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: #FF6B6B (Coral Red)
- **Secondary**: #4ECDC4 (Turquoise)
- **Accent**: #45B7D1 (Sky Blue)
- **Background**: #F7F7F7 (Light Gray)
- **Text**: #2C3E50 (Dark Blue Gray)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Rounded corners (16px)
- Consistent spacing (8px grid)
- Smooth animations (300ms ease)
- Mobile-first responsive design

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture
- Custom hooks for logic reuse

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Other Platforms

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **Hostinger**: Upload build files to hosting

## 📱 PWA Features

- Service worker for offline functionality
- App manifest for home screen installation
- Push notifications
- Responsive design for all devices

## 🔒 Security

- Firebase Authentication
- Firestore security rules
- Input validation
- XSS protection
- HTTPS enforcement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@vulugo.com or create an issue on GitHub.

---

**Built with ❤️ by the VuluGO Team**
