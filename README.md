# WeatherPro Analytics Dashboard

A modern, professional weather analytics dashboard built with React, Redux Toolkit, Tailwind CSS, and Firebase AuTailwind Con. Features real-time weather data, interactive forecasts, beautiful visualizations, and Google authentication.

![WeatherPro Dashboard](https://img.shields.io/badge/React-18+-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC.svg)

## 🌟 Features

### 🎨 **Modern Design System**
- **Dark Theme**: Professional slate/blue/indigo gradient backgrounds
- **Glass Morphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Fade-in, float, and hover micro-interactions
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices

### 🔐hentication Sym**
- **Google OAuth**: One-click sign-in with Firebase Authen
- **Protected Routes**: Secure dashboarde OAess
- **Persistent Sessions**: Stay logged in between vithts
- **Persistent Sessions**: Stay logged in between visits
- **Beautiful Auth Pages**: Modern login/register forms with glass effects

### 🌦️ **Weather Features**
- **Real-time Data**: Live weather updates every 60 seconds
- **Global Coverage**: Access weather data from 200,000+ cities worldwide
- **7-Day Forecasts**: Extended weather predictions with hourly breakdowns
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Smart Search**: City autocomplete with instant results
- **Favorites System**: Save and manage favorite cities

### 📊 **Data Visualization**
- **Temperature Trends**: Hourly and daily temperature charts
- **Weather Metrics**: Humidity, wind speed, pressure, visibility
- **Forecast Charts**: Interactive bar and line charts
- **Weather Icons**: Dynamic weather condition indicators
- **Unit Conversion**: Celsius/Fahrenheit switching

### ⚡ **Performance & UX**
- **Smart Caching**: Reduces API calls with 60-second data freshness
- **Loading States**: Beautiful spinners and skeleton screens
- **Error Handling**: Graceful error messages and recovery
- **Optimized Rendering**: React.memo and efficient state management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- WeatherAPI.com API key (free tier available)
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weatherpro-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install react-router-dom firebase @reduxjs/toolkit react-redux recharts lucide-react axios
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Update `src/config/firebase.js` with your Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     // ... other config
   };
   ```

4. **Get WeatherAPI Key**
   - Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
   - Get your free API key (1 million calls/month)
   - Update `src/store/weatherSlice.js`:
   ```javascript
   const API_KEY = 'your_weatherapi_key_here';
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Home.jsx              # Landing page with features
│   ├── Login.jsx             # Authentication login form
│   ├── Register.jsx          # User registration form
│   ├── Dashboard.jsx         # Main weather dashboard
│   ├── WeatherCard.jsx       # Individual city weather card
│   ├── DetailedView.jsx      # Detailed weather analytics
│   ├── SearchBar.jsx         # City search with autocomplete
│   ├── SettingsModal.jsx     # User preferences modal
│   ├── Navbar.jsx            # Navigation with user menu
│   └── ProtectedRoute.jsx    # Route protection component
├── store/
│   ├── store.js              # Redux store configuration
│   ├── weatherSlice.js       # Weather state management
│   └── authSlice.js          # Authentication state
├── utils/
│   └── weatherUtils.js       # Weather utility functions
├── config/
│   └── firebase.js           # Firebase configuration
├── App.jsx                   # Main app component with routing
├── main.jsx                  # App entry point
└── index.css                 # Global styles and animations
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Slate 900 → Blue 900 → Indigo 900 gradients
- **Accent**: Blue 400, Purple 400, Emerald 400
- **Text**: White, Slate 300, Slate 400
- **Glass**: rgba(255, 255, 255, 0.05) with backdrop blur

### **Components**
- **Glass Cards**: Frosted glass effect with subtle borders
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Glass input fields with icon indicators
- **Charts**: Dark theme with custom tooltips and colors

### **Animations**
- **fadeInUp**: Smooth entrance animations
- **float**: Gentle floating motion for background elements
- **card-hover**: Lift effect on interactive cards
- **pulse-glow**: Subtle glow effects for emphasis

## 📱 Pages & Navigation

### **Public Routes**
- **/** → Home page with feature showcase
- **/login** → User authentication
- **/register** → Account creation

### **Protected Routes** (Requires Authentication)
- **/dashboard** → Main weather dashboard
- **Detailed View** → In-depth city weather analysis

### **Navigation Flow**
1. **Home Page**: Feature overview with call-to-action buttons
2. **Authentication**: Google OAuth or email/password
3. **Dashboard**: Weather cards grid with search and favorites
4. **Detailed View**: Charts, forecasts, and comprehensive data
5. **Settings**: Temperature units and favorites management

## 🔧 Configuration

### **Weather API Setup**
```javascript
// src/store/weatherSlice.js
const API_KEY = 'your_weatherapi_key_here';
const BASE_URL = 'https://api.weatherapi.com/v1';
```

### **Default Cities**
```javascript
// src/components/Dashboard.jsx
const defaultCities = ['London', 'New York', 'Tokyo'];
```

### **Firebase Configuration**
```javascript
// src/config/firebase.js
const firebaseConfig = {
  // Your Firebase project configuration
};
```

## 📊 Features Overview

### **Dashboard**
- **Weather Cards**: Glass morphism cards with current conditions
- **Search Bar**: Real-time city search with autocomplete
- **Favorites**: Heart icon to save/remove favorite cities
- **Refresh**: Manual data refresh with loading indicators
- **Settings**: Temperature unit preferences

### **Detailed View**
- **Current Weather**: Large display with comprehensive metrics
- **Hourly Chart**: Temperature trends for the current day
- **7-Day Forecast**: Extended predictions with bar charts
- **Weather Stats**: Humidity, wind, pressure, visibility
- **Forecast List**: Detailed daily breakdown

### **Authentication**
- **Google OAuth**: One-click sign-in with Google
- **Form Validation**: Email/password with show/hide toggles
- **Persistent Login**: Automatic session management
- **Secure Logout**: Clean session termination

## 🎯 Performance Optimizations

- **Data Caching**: 60-second cache to minimize API calls
- **Lazy Loading**: Components load on demand
- **Optimized Rendering**: React.memo for expensive components
- **Efficient State**: Redux Toolkit for optimized updates
- **Image Optimization**: Optimized weather icons and assets

## 🔒 Security Features

- **Firebase Auth**: Enterprise-grade authentication
- **Protected Routes**: Unauthorized access prevention
- **Input Validation**: XSS and injection protection
- **Secure API Keys**: Environment variable recommendations
- **HTTPS Only**: Secure data transmission

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: 320px - 767px (Single column layout)
- **Tablet**: 768px - 1023px (Two column grid)
- **Desktop**: 1024px+ (Multi-column grid)

### **Adaptive Features**
- **Navigation**: Collapsible mobile menu
- **Cards**: Responsive grid with optimal spacing
- **Charts**: Scalable visualizations
- **Typography**: Fluid text sizing

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

### **Deploy to Netlify**
1. Build: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure environment variables

### **Environment Variables**
```env
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

## 🛠️ Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Code Style**
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting
- **Tailwind**: Utility-first CSS
- **Component Structure**: Functional components with hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push feature/amazing-feature`
5. Open a Pull Request

### **Development Guidelines**
- Follow existing code style ands
- Add coor complex l new features thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[WeatherAPI.com](https://www.weatherapi.com/)** - Weather data provider
- **[Firebase](https://firebase.google.com/)** - Authentication and backend services
- **[Recharts](https://recharts.org/)** - Beautiful React charts
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Redux Toolkit](https://redux-toolkit.js.org/)ate management

## 📞 Support
port, emailyour-email@exampleeate an issue in the repository.

---

 with ❤️ using Reactrebase,  modern webhnologies