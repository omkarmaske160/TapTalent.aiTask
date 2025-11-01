export const getWeatherIcon = (condition, isDay = true) => {
    const iconMap = {
        'sunny': '☀️',
        'clear': isDay ? '☀️' : '🌙',
        'partly cloudy': isDay ? '⛅' : '☁️',
        'cloudy': '☁️',
        'overcast': '☁️',
        'mist': '🌫️',
        'fog': '🌫️',
        'light rain': '🌦️',
        'moderate rain': '🌧️',
        'heavy rain': '⛈️',
        'light snow': '🌨️',
        'moderate snow': '❄️',
        'heavy snow': '❄️',
        'thunderstorm': '⛈️',
        'drizzle': '🌦️',
    };

    const conditionLower = condition.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
        if (conditionLower.includes(key)) {
            return icon;
        }
    }
    return isDay ? '☀️' : '🌙';
};

export const formatTemperature = (temp, unit) => {
    if (unit === 'fahrenheit') {
        return `${Math.round(temp * 9 / 5 + 32)}°F`;
    }
    return `${Math.round(temp)}°C`;
};

export const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

export const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
};

export const isDataStale = (timestamp, maxAge = 60000) => {
    return Date.now() - timestamp > maxAge;
};