import { useState, useEffect } from "react";

function WeatherApp() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState("");

    const API_KEY = "YOUR_WEATHERSTACK_API_KEY";

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch(
                    `https://api.weatherstack.com/current?access_key=${API_KEY}&query=Kuala Lumpur`
                );

                const data = await response.json();

                console.log(data);

                if (data.error) {
                    setError(data.error.info);
                    return;
                }

                setWeather(data.current);
                setLocation(data.location);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch weather data.");
            }
        }

        fetchWeather();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!weather || !location) {
        return <p>Loading weather...</p>;
    }

    return (
        <div>
            <h2>Current Weather</h2>

            <h3>
                {location.name}, {location.country}
            </h3>

            <p>Temperature: {weather.temperature} °C</p>

            <p>
                Weather: {weather.weather_descriptions?.[0]}
            </p>

            <p>Humidity: {weather.humidity}%</p>

            <p>Wind Speed: {weather.wind_speed} km/h</p>

            <p>Feels Like: {weather.feelslike} °C</p>
        </div>
    );
}

export default WeatherApp;