import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Wind, Droplets, Eye, Thermometer, Gauge, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchForecast } from '../store/weatherSlice';
import { getWeatherIcon, formatTemperature, formatTime, formatDate, getWindDirection } from '../utils/weatherUtils';

const DetailedView = ({ cityName, onBack }) => {
    const dispatch = useDispatch();
    const { forecasts, unit } = useSelector(state => state.weather);

    const forecast = forecasts[cityName];

    useEffect(() => {
        if (cityName && !forecast) {
            dispatch(fetchForecast({ city: cityName, days: 7 }));
        }
    }, [cityName, forecast, dispatch]);

    if (!forecast) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="glass-card p-12 rounded-3xl">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                    <p className="text-slate-300 text-xl">Loading detailed forecast...</p>
                </div>
            </div>
        );
    }

    const current = forecast.current;
    const location = forecast.location;
    const forecastDays = forecast.forecast.forecastday;

    // Prepare hourly data for today
    const todayHourly = forecastDays[0]?.hour?.map(hour => ({
        time: formatTime(hour.time),
        temp: unit === 'celsius' ? hour.temp_c : hour.temp_f,
        humidity: hour.humidity,
        windSpeed: hour.wind_kph,
    })) || [];

    // Prepare daily forecast data
    const dailyData = forecastDays.map(day => ({
        date: formatDate(day.date),
        maxTemp: unit === 'celsius' ? day.day.maxtemp_c : day.day.maxtemp_f,
        minTemp: unit === 'celsius' ? day.day.mintemp_c : day.day.mintemp_f,
        condition: day.day.condition.text,
        icon: getWeatherIcon(day.day.condition.text),
        humidity: day.day.avghumidity,
        windSpeed: day.day.maxwind_kph,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center mb-12 animate-fadeInUp">
                    <button
                        onClick={onBack}
                        className="glass-card p-4 rounded-2xl hover:bg-white/10 transition-all mr-6 group"
                    >
                        <ArrowLeft className="w-6 h-6 text-blue-400 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            {location.name}
                            <span className="text-slate-400 text-2xl md:text-3xl ml-2">
                                , {location.region}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300">{location.country}</p>
                    </div>
                </div>

                {/* Current Weather Hero */}
                <div className="glass-card rounded-3xl p-8 md:p-12 mb-12 animate-fadeInUp">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                        <div className="flex items-center space-x-8 mb-8 lg:mb-0">
                            <span className="text-8xl md:text-9xl">
                                {getWeatherIcon(current.condition.text, current.is_day)}
                            </span>
                            <div>
                                <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                                    {formatTemperature(current.temp_c, unit)}
                                </div>
                                <div className="text-2xl text-slate-300 capitalize mb-2">
                                    {current.condition.text}
                                </div>
                                <div className="text-lg text-slate-400">
                                    Feels like {formatTemperature(current.feelslike_c, unit)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weather Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="glass p-6 rounded-2xl text-center">
                            <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <div className="text-sm font-medium text-slate-300 mb-2">Humidity</div>
                            <div className="text-3xl font-bold text-white">{current.humidity}%</div>
                        </div>

                        <div className="glass p-6 rounded-2xl text-center">
                            <Wind className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                            <div className="text-sm font-medium text-slate-300 mb-2">Wind Speed</div>
                            <div className="text-3xl font-bold text-white">{current.wind_kph}</div>
                            <div className="text-sm text-slate-400">km/h {getWindDirection(current.wind_degree)}</div>
                        </div>

                        <div className="glass p-6 rounded-2xl text-center">
                            <Eye className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                            <div className="text-sm font-medium text-slate-300 mb-2">Visibility</div>
                            <div className="text-3xl font-bold text-white">{current.vis_km}</div>
                            <div className="text-sm text-slate-400">km</div>
                        </div>

                        <div className="glass p-6 rounded-2xl text-center">
                            <Gauge className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                            <div className="text-sm font-medium text-slate-300 mb-2">Pressure</div>
                            <div className="text-3xl font-bold text-white">{current.pressure_mb}</div>
                            <div className="text-sm text-slate-400">mb</div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
                    {/* Hourly Temperature Chart */}
                    <div className="glass-card rounded-3xl p-8 animate-fadeInUp">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                            <Thermometer className="w-6 h-6 text-blue-400" />
                            <span>Today's Temperature</span>
                        </h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={todayHourly}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="time" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                        border: '1px solid #475569',
                                        borderRadius: '12px',
                                        color: '#f1f5f9'
                                    }}
                                    formatter={(value) => [`${Math.round(value)}°${unit === 'celsius' ? 'C' : 'F'}`, 'Temperature']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="temp"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                                    activeDot={{ r: 8, fill: '#60a5fa' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Daily Forecast Chart */}
                    <div className="glass-card rounded-3xl p-8 animate-fadeInUp">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                            <Sun className="w-6 h-6 text-yellow-400" />
                            <span>7-Day Forecast</span>
                        </h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                                        border: '1px solid #475569',
                                        borderRadius: '12px',
                                        color: '#f1f5f9'
                                    }}
                                    formatter={(value, name) => [
                                        `${Math.round(value)}°${unit === 'celsius' ? 'C' : 'F'}`,
                                        name === 'maxTemp' ? 'Max' : 'Min'
                                    ]}
                                />
                                <Bar dataKey="maxTemp" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="minTemp" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 7-Day Forecast List */}
                <div className="glass-card rounded-3xl p-8 animate-fadeInUp">
                    <h3 className="text-2xl font-bold text-white mb-8">
                        Extended Forecast
                    </h3>
                    <div className="space-y-4">
                        {dailyData.map((day, index) => (
                            <div key={index} className="glass p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all">
                                <div className="flex items-center space-x-6">
                                    <span className="text-4xl">{day.icon}</span>
                                    <div>
                                        <div className="font-bold text-xl text-white">{day.date}</div>
                                        <div className="text-slate-300 capitalize">{day.condition}</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8">
                                    <div className="flex items-center space-x-4 text-slate-300">
                                        <div className="flex items-center space-x-2">
                                            <Droplets className="w-4 h-4 text-blue-400" />
                                            <span>{day.humidity}%</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Wind className="w-4 h-4 text-emerald-400" />
                                            <span>{day.windSpeed} km/h</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">
                                            {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedView;