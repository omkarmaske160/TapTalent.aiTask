import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, X, MapPin } from 'lucide-react';
import { searchCities, clearSearchResults, fetchCurrentWeather } from '../store/weatherSlice';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { searchResults } = useSelector(state => state.weather);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.length > 2) {
                dispatch(searchCities(query));
                setIsOpen(true);
            } else {
                dispatch(clearSearchResults());
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, dispatch]);

    const handleCitySelect = (city) => {
        dispatch(fetchCurrentWeather(city.name));
        setQuery('');
        setIsOpen(false);
        dispatch(clearSearchResults());
    };

    const handleClear = () => {
        setQuery('');
        setIsOpen(false);
        dispatch(clearSearchResults());
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search cities worldwide..."
                    className="w-full pl-12 pr-12 py-4 glass-card rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {isOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-card border border-slate-600 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                    {searchResults.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => handleCitySelect(city)}
                            className="w-full px-6 py-4 text-left hover:bg-white/10 flex items-center space-x-4 border-b border-slate-700 last:border-b-0 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                        >
                            <div className="bg-blue-500/20 p-2 rounded-xl">
                                <MapPin className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                                <div className="font-semibold text-white">{city.name}</div>
                                <div className="text-sm text-slate-400">
                                    {city.region}, {city.country}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;