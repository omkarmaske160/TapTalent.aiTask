# Weather Analytics Dashboard

A modern, responsive weather dashboard built with React, Redux Toolkit, and Tailwind CSS. Features real-time weather data, forecasts, interactive charts, and favorites management.

## 🌟 Features

### Core Features
- **Dashboard**: Summary cards for multiple cities with current weather
- **Detailed View**: In-depth analytics with 7-day forecast and hourly data
- **Search & Favorites**: City search with autocomplete and persistent favorites
- **Data Visualization**: Interactive charts showing temperature trends and patterns
- **Settings**: Temperature unit switching (Celsius/Fahrenheit)

### Technical Features
- **Real-time Data**: Auto-refresh every 60 seconds
- **Caching**: Smart data caching to reduce API calls
- **Responsive Design**: Works on desktop, tablet, and mobile
- **State Management**: Redux Toolkit for centralized state
- **Error Handling**: Graceful error handling and loading states

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- WeatherAPI.com API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install react-router-dom firebase @reduxjs/toolkit react-redux recharts lucide-react axios
   ```

3. **Get your API key**
   - Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
   - Get your free API key

4. **Configure API key**
   - Open `src/store/weatherSlice.js`
   - Replace `'your_api_key_here'` with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📦 Required Dependencies

Make sure to install these packages:

```bash
npm install @reduxjs/toolkit react-redux recharts lucide-react axios
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with weather cards
│   ├── WeatherCard.jsx        # Individual city weather card
│   ├── DetailedView.jsx       # Detailed weather view with charts
│   ├── SearchBar.jsx          # City search with autocomplete
│   └── SettingsModal.jsx      # Settings modal for preferences
├── store/
│   ├── store.js              # Redux store configuration
│   └── weatherSlice.js       # Weather state management
├── utils/
│   └── weatherUtils.js       # Utility functions
├── App.jsx                   # Main app component
├── main.jsx                  # App entry point
└── index.css                 # Global styles
```

## 🎨 Features Overview

### Dashboard
- Clean, modern interface with weather cards
- Real-time weather updates
- Favorite cities management
- Search functionality with autocomplete
- Responsive grid layout

### Detailed View
- 7-day weather forecast
- Hourly temperature charts
- Interactive data visualizations
- Comprehensive weather metrics (humidity, wind, pressure, visibility)
- Beautiful weather icons and animations

### Settings
- Temperature unit switching (°C/°F)
- Favorites management
- Persistent user preferences

## 🔧 Configuration

### API Configuration
The app uses WeatherAPI.com for weather data. Configure your API key in `src/store/weatherSlice.js`:

```javascript
const API_KEY = 'your_api_key_here';
```

### Default Cities
You can modify the default cities shown on the dashboard by editing the `defaultCities` array in `src/components/Dashboard.jsx`:

```javascript
const defaultCities = ['London', 'New York', 'Tokyo', 'Your City'];
```

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Usage

1. **View Weather**: The dashboard shows weather for default cities and your favorites
2. **Search Cities**: Use the search bar to find and add new cities
3. **Add Favorites**: Click the heart icon on any weather card to favorite it
4. **View Details**: Click on any weather card to see detailed forecasts and charts
5. **Change Settings**: Click the settings icon to change temperature units and manage favorites

## 🔄 Data Management

- **Caching**: Weather data is cached for 60 seconds to reduce API calls
- **Auto-refresh**: Data automatically refreshes when stale
- **Persistence**: Favorites and settings are saved to localStorage
- **Error Handling**: Graceful handling of network errors and API limits

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Custom styles in `src/index.css`
- Component-specific styles in individual components

### Weather Icons
Weather icons are emoji-based and can be customized in `src/utils/weatherUtils.js`:

```javascript
const iconMap = {
  'sunny': '☀️',
  'cloudy': '☁️',
  // Add your custom icons here
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

## 📊 Performance

- **Lazy Loading**: Components load on demand
- **Optimized Rendering**: React.memo and useMemo for performance
- **Efficient State**: Redux Toolkit for optimized state updates
- **Smart Caching**: Reduces unnecessary API calls

## 🔒 Security

- API keys should be stored securely (consider environment variables for production)
- Input validation for search queries
- Error boundaries for graceful error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide React](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling