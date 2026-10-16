import React, { useState } from 'react';

// Mock Data Source
const MOCK_WEATHER_DATA = {
    'New York': {
        city: 'New York',
        temperature: 28, // Celsius
        condition: 'Sunny', // Options: Sunny, Rainy, Cloudy, Snowy
        humidity: '65%',
        windSpeed: '12 km/h',
        uvIndex: 'High',
        forecast: [
            { day: 'Mon', temp: 27 },
            { day: 'Tue', temp: 29 },
            { day: 'Wed', temp: 26 },
        ],
    },
    'London': {
        city: 'London',
        temperature: 12,
        condition: 'Rainy',
        humidity: '85%',
        windSpeed: '20 km/h',
        uvIndex: 'Low',
        forecast: [
            { day: 'Mon', temp: 11 },
            { day: 'Tue', temp: 13 },
            { day: 'Wed', temp: 10 },
        ],
    },
    'Tokyo': {
        city: 'Tokyo',
        temperature: -2,
        condition: 'Snowy',
        humidity: '70%',
        windSpeed: '15 km/h',
        uvIndex: 'Moderate',
        forecast: [
            { day: 'Mon', temp: -1 },
            { day: 'Tue', temp: 0 },
            { day: 'Wed', temp: -3 },
        ],
    },
};

export default function WeatherDashboard() {
    const [selectedCity, setSelectedCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // Handle City Fetch Simulation
    const handleFetchWeather = (city) => {
        if (!city) return;

        setSelectedCity(city);
        setLoading(true);
        setError(null);
        setWeather(null);

        // Simulate API Call
        setTimeout(() => {
            if (MOCK_WEATHER_DATA[city]) {
                setWeather(MOCK_WEATHER_DATA[city]);
                setLoading(false);
            } else {
                setError(`Failed to fetch weather data for "${city}".`);
                setLoading(false);
            }
        }, 1000);
    };

    // 1. Weather Icon Mapping
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Sunny':
                return '☀️';
            case 'Rainy':
                return '🌧️';
            case 'Cloudy':
                return '☁️';
            case 'Snowy':
                return '❄️';
            default:
                return '🌡️';
        }
    };

    // 2. Temperature Styling Class
    const getTemperatureStyle = (temp) => {
        if (temp >= 25) return { color: '#e63946', fontWeight: 'bold' }; // Warm/Hot
        if (temp <= 5) return { color: '#0077b6', fontWeight: 'bold' };  // Cold
        return { color: '#2a9d8f', fontWeight: 'bold' };               // Mild
    };

    return (
        <div style={{ maxWidth: '450px', margin: '2rem auto', fontFamily: 'sans-serif', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Weather Dashboard</h2>

            {/* Location Selector */}
            <div style={{ marginBottom: '1rem' }}>
                <select
                    value={selectedCity}
                    onChange={(e) => handleFetchWeather(e.target.value)}
                    style={{ padding: '8px', width: '100%', fontSize: '1rem' }}
                >
                    <option value="">-- Select a Location --</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Invalid">Unknown City (Triggers Error)</option>
                </select>
            </div>

            {/* 3. Loading State */}
            {loading && <div style={{ textAlign: 'center', padding: '1rem' }}>⏳ Loading weather data...</div>}

            {/* 4. Error Handling State */}
            {error && !loading && (
                <div style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '4px' }}>
                    ⚠️ {error}
                </div>
            )}

            {/* 5. Empty State */}
            {!selectedCity && !loading && !error && (
                <div style={{ textAlign: 'center', color: '#666', padding: '2rem 0' }}>
                    📍 Please select a location to view the weather forecast.
                </div>
            )}

            {/* Main Weather Content */}
            {weather && !loading && (
                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3>{weather.city}</h3>
                        <span style={{ fontSize: '2rem' }}>{getWeatherIcon(weather.condition)}</span>
                    </div>

                    <p style={{ fontSize: '1.5rem', ...getTemperatureStyle(weather.temperature) }}>
                        {weather.temperature}°C <span style={{ fontSize: '1rem', color: '#555' }}>({weather.condition})</span>
                    </p>

                    {/* Toggle Detailed Forecast Preference */}
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '1rem' }}
                    >
                        {showDetails ? 'Hide Detailed Forecast' : 'Show Detailed Forecast'}
                    </button>

                    {/* 6. Show/Hide Detailed Forecast */}
                    {showDetails && (
                        <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                            <h4>Details & Forecast</h4>
                            <p><strong>Humidity:</strong> {weather.humidity}</p>
                            <p><strong>Wind Speed:</strong> {weather.windSpeed}</p>
                            <p><strong>UV Index:</strong> {weather.uvIndex}</p>

                            <h5>3-Day Forecast:</h5>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {weather.forecast.map((item, index) => (
                                    <div key={index} style={{ border: '1px solid #ddd', padding: '8px', borderRadius: '4px', flex: 1, textAlign: 'center' }}>
                                        <div><strong>{item.day}</strong></div>
                                        <div style={getTemperatureStyle(item.temp)}>{item.temp}°C</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}