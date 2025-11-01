import { useDispatch, useSelector } from 'react-redux';
import { X, Thermometer, Trash2, Heart, Info } from 'lucide-react';
import { toggleUnit, removeFavorite } from '../store/weatherSlice';

const SettingsModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { unit, favorites } = useSelector(state => state.weather);

    if (!isOpen) return null;

    const handleUnitToggle = () => {
        dispatch(toggleUnit());
    };

    const handleRemoveFavorite = (cityName) => {
        dispatch(removeFavorite(cityName));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="glass-card rounded-3xl w-full max-w-lg animate-fadeInUp">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-slate-700">
                    <h2 className="text-3xl font-bold text-white">Settings</h2>
                    <button
                        onClick={onClose}
                        className="glass p-3 rounded-2xl hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Temperature Unit */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                            <Thermometer className="w-6 h-6 text-blue-400" />
                            <span>Temperature Unit</span>
                        </h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleUnitToggle}
                                className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all ${unit === 'celsius'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'glass text-slate-300 hover:bg-white/10'
                                    }`}
                            >
                                Celsius (°C)
                            </button>
                            <button
                                onClick={handleUnitToggle}
                                className={`flex-1 py-4 px-6 rounded-2xl font-semibold transition-all ${unit === 'fahrenheit'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        : 'glass text-slate-300 hover:bg-white/10'
                                    }`}
                            >
                                Fahrenheit (°F)
                            </button>
                        </div>
                    </div>

                    {/* Favorite Cities */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                            <Heart className="w-6 h-6 text-red-400" />
                            <span>Favorite Cities</span>
                            <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm">
                                {favorites.length}
                            </span>
                        </h3>
                        {favorites.length === 0 ? (
                            <div className="glass p-8 rounded-2xl text-center">
                                <Heart className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                                <p className="text-slate-400 text-lg">
                                    No favorite cities yet
                                </p>
                                <p className="text-slate-500 text-sm mt-2">
                                    Add cities to favorites from the dashboard
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {favorites.map((city, index) => (
                                    <div
                                        key={index}
                                        className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-blue-500/20 p-2 rounded-xl">
                                                <Heart className="w-4 h-4 text-red-400 fill-current" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">{city.name}</div>
                                                <div className="text-sm text-slate-400">
                                                    {city.region}, {city.country}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFavorite(city.name)}
                                            className="glass p-2 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* API Info */}
                    <div className="glass p-6 rounded-2xl border border-blue-500/30">
                        <div className="flex items-start space-x-4">
                            <Info className="w-6 h-6 text-blue-400 mt-1" />
                            <div>
                                <h4 className="font-bold text-blue-300 mb-2">API Configuration</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    This application uses WeatherAPI.com for real-time weather data.
                                    Make sure to configure your API key in the weatherSlice.js file for full functionality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-700">
                    <button
                        onClick={onClose}
                        className="w-full btn-primary py-4 text-lg rounded-2xl"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;