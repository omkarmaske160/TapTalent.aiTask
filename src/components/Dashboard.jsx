import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshCw, Settings } from 'lucide-react';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import { fetchCurrentWeather } from '../store/weatherSlice';
import { isDataStale } from '../utils/weatherUtils';

const Dashboard = ({ onSettingsClick, onCardClick }) => {
    const dispatch = useDispatch();
    const { currentWeather, favorites, loading, error, lastUpdated } = useSelector(state => state.weather);

    useEffect(() => {
        // Load default cities and favorites
        const defaultCities = ['London', 'New York', 'Tokyo'];
        const citiesToLoad = [...new Set([...defaultCities, ...favorites.map(fav => fav.name)])];

        citiesToLoad.forEach(city => {
            const lastUpdate = lastUpdated[city];
            if (!currentWeather[city] || (lastUpdate && isDataStale(lastUpdate))) {
                dispatch(fetchCurrentWeather(city));
            }
        });
    }, [dispatch, favorites, currentWeather, lastUpdated]);

    const handleRefresh = () => {
        Object.keys(currentWeather).forEach(city => {
            dispatch(fetchCurrentWeather(city));
        });
    };

    const weatherCards = Object.values(currentWeather);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 space-y-6 lg:space-y-0">
                    <div className="animate-fadeInUp">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Weather
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300">
                            Real-time weather data and forecasts from around the world
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <SearchBar />
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="glass-card p-4 rounded-2xl hover:bg-white/10 transition-all disabled:opacity-50 group"
                        >
                            <RefreshCw className={`w-6 h-6 text-blue-400 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                        </button>
                        <button
                            onClick={onSettingsClick}
                            className="glass-card p-4 rounded-2xl hover:bg-white/10 transition-all group"
                        >
                            <Settings className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="glass-card border border-red-500/30 bg-red-500/10 text-red-300 px-6 py-4 rounded-2xl mb-8 animate-fadeInUp">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* Weather Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {weatherCards.map((weather, index) => (
                        <div
                            key={weather.location.name}
                            className="animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <WeatherCard
                                weatherData={weather}
                                onCardClick={onCardClick}
                            />
                        </div>
                    ))}
                </div>

                {/* Loading State */}
                {loading && weatherCards.length === 0 && (
                    <div className="flex justify-center items-center py-20">
                        <div className="glass-card p-8 rounded-3xl">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                            <p className="text-slate-300 text-lg">Loading weather data...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && weatherCards.length === 0 && (
                    <div className="text-center py-20">
                        <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
                            <div className="text-8xl mb-6">🌤️</div>
                            <h3 className="text-3xl font-bold text-white mb-4">
                                No Weather Data
                            </h3>
                            <p className="text-slate-300 text-lg">
                                Search for a city to get started with weather insights
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;