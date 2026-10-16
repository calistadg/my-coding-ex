import { useState } from "react";

function TemperatureConverter() {
    const [celcius, setCelcius] = useState('');
    const [fahrenheit, setFahrenheit] = useState('');

    const handleCelciusChange = (e) => {
        const value = e.target.value;
        setCelcius(value);
        setFahrenheit(value === '' ? '' : ((value * 9) / 5 + 32).toFixed(2));
    };

    const handleFahrenheitChange = (e) => {
        const value = e.target.value;
        setFahrenheit(value);
        setCelcius(value === '' ? '' : (((value - 32) * 5) / 9).toFixed(2));
    };

    return (
        <div>
            <h2>Temperature Converter</h2>
            <label>
                Celcius:
                <input type="number" value={celcius} onChange={handleCelciusChange} />
            </label>
            <br />
            <label>
                Fahrenheit:
                <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} />
            </label>
        </div>
    );
}

export default TemperatureConverter;
