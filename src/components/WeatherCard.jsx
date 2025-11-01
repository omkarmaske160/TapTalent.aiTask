import { useDispatch, useSelector } from 'react-redux';
import { Heart, MapPin, Wind, Droplets, Thermometer } from 'lucide-react';
import { addFavorite, removeFavorite, setSelectedCity } from '../store/weatherSlice';
import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils';

const WeatherCard = ({ weatherData, onCardClick }) => {
    const dispatch = useDispatch();
    const { favorites, unit } = useSelector(state => state.weather);

    const isFavorite = favorites.some(fav => fav.name === weatherData.location.name);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFavorite(weatherData.location.name));
        } else {
            dispatch(addFavorite({
                name: weatherData.location.name,
                country: weatherData.location.country,
                region: weatherData.location.region
            }));
        }
    };

    const handleCardClick = () => {
        dispatch(setSelectedCity(weatherData.location.name));
        onCardClick && onCardClick(weatherData);
    };

    return (
        <div
            className="glass-card rounded-3xl p-8 cursor-pointer card-hover group relative overflow-hidden"
            onClick={handleCardClick}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <div>
                            <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                                {weatherData.location.name}
                            </h3>
                            <p className="text-sm text-slate-400">
                                {weatherData.location.region}, {weatherData.location.country}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleFavoriteClick}
                        className={`p-3 rounded-2xl transition-all ${isFavorite
                                ? 'text-red-400 bg-red-500/20 hover:bg-red-500/30'
                                : 'text-slate-400 hover:text-red-400 hover:bg-red-500/20'
                            }`}
                    >
                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Weather Info */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-6">
                        <span className="text-6xl">
                            {getWeatherIcon(weatherData.current.condition.text, weatherData.current.is_day)}
                        </span>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">
                                {formatTemperature(weatherData.current.temp_c, unit)}
                            </div>
                            <div className="text-sm text-slate-400 flex items-center space-x-2">
                                <Thermometer className="w-4 h-4" />
                                <span>Feels like {formatTemperature(weatherData.current.feelslike_c, unit)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Condition */}
                <div className="text-lg text-slate-300 mb-6 capitalize font-medium">
                    {weatherData.current.condition.text}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="glass p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                            <Droplets className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-medium text-slate-300">Humidity</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {weatherData.current.humidity}%
                        </div>
                    </div>
                    <div className="glass p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                            <Wind className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm font-medium text-slate-300">Wind</span>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {weatherData.current.wind_kph}
                        </div>
                        <div className="text-xs text-slate-400">km/h</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;