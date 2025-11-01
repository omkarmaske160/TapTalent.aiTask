import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DetailedView from './components/DetailedView';
import SettingsModal from './components/SettingsModal';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const WeatherApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleCardClick = (weatherData) => {
    setSelectedCity(weatherData.location.name);
    setCurrentView('detailed');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCity(null);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {currentView === 'dashboard' ? (
        <Dashboard
          onCardClick={handleCardClick}
          onSettingsClick={handleSettingsClick}
        />
      ) : (
        <DetailedView
          cityName={selectedCity}
          onBack={handleBackToDashboard}
        />
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={handleSettingsClose}
      />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WeatherApp />
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;