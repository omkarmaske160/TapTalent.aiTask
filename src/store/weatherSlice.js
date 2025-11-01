import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ✅ Direct API key (your working one)
const API_KEY = '0f287d714b054836be174813250111';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Helper function for fetching + error handling
async function fetchJsonOrThrow(url) {
    const res = await fetch(url);
    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.error) {
        const msg = data?.error?.message || `Request failed with status ${res.status}`;
        throw new Error(msg);
    }

    return data;
}

// ✅ Get current weather
export const fetchCurrentWeather = createAsyncThunk(
    'weather/fetchCurrent',
    async (city) => {
        const response = await fetchJsonOrThrow(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
        );
        return response;
    }
);

// ✅ Get 7-day forecast
export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async ({ city, days = 7 }) => {
        const response = await fetchJsonOrThrow(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=yes`
        );
        return response;
    }
);

// ✅ Search for city suggestions
export const searchCities = createAsyncThunk(
    'weather/searchCities',
    async (query) => {
        const response = await fetchJsonOrThrow(
            `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
        );
        return response;
    }
);

// ✅ Slice
const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentWeather: {},
        forecasts: {},
        favorites: JSON.parse(localStorage.getItem('weatherFavorites')) || [],
        searchResults: [],
        selectedCity: null,
        unit: localStorage.getItem('weatherUnit') || 'celsius',
        loading: false,
        error: null,
        lastUpdated: {},
    },
    reducers: {
        addFavorite: (state, action) => {
            const city = action.payload;
            if (!state.favorites.find(f => f.name === city.name)) {
                state.favorites.push(city);
                localStorage.setItem('weatherFavorites', JSON.stringify(state.favorites));
            }
        },
        removeFavorite: (state, action) => {
            const cityName = action.payload;
            state.favorites = state.favorites.filter(f => f.name !== cityName);
            localStorage.setItem('weatherFavorites', JSON.stringify(state.favorites));
        },
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        toggleUnit: (state) => {
            state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
            localStorage.setItem('weatherUnit', state.unit);
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Current weather
            .addCase(fetchCurrentWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
                state.loading = false;
                const cityName = action.payload.location.name;
                state.currentWeather[cityName] = action.payload;
                state.lastUpdated[cityName] = Date.now();
            })
            .addCase(fetchCurrentWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Forecast
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.loading = false;
                const cityName = action.payload.location.name;
                state.forecasts[cityName] = action.payload;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // City search
            .addCase(searchCities.fulfilled, (state, action) => {
                state.searchResults = action.payload;
            })
            .addCase(searchCities.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const {
    addFavorite,
    removeFavorite,
    setSelectedCity,
    toggleUnit,
    clearSearchResults,
    clearError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
