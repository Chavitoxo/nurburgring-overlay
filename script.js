async function loadTiming(){

    const response = await fetch('/api/timing');

    const data = await response.json();

    const rows = document.getElementById('rows');

    rows.innerHTML = '';

    data
    .slice(0,10)
    .forEach(car => {

        const row = document.createElement('div');

        row.className = 'row';

        row.innerHTML = `
            <div>${car.POS || '-'}</div>
            <div>${car.TEAM || '-'}</div>
            <div>${car.NAME || '-'}</div>
            <div>${car.LAPS || '-'}</div>
            <div>${car.FASTESTLAP || '-'}</div>
            <div>${car.GAP || '-'}</div>
        `;

        rows.appendChild(row);

    });

}

setInterval(loadTiming,1000);

loadTiming();

async function loadWeather(){

    const apiKey = 'f49f608b3c3660ce3817d6574eb64124';

    const lat = 50.3356;
    const lon = 6.9475;

    const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    const weather =
    data.weather[0].description;

    let weatherIcon = '🌤️';

    if(weather.includes('rain')){

        weatherIcon = '🌧️';

    }
    else if(weather.includes('cloud')){

        weatherIcon = '☁️';

    }
    else if(weather.includes('clear')){

        weatherIcon = '☀️';

    }
    else if(weather.includes('thunderstorm')){

        weatherIcon = '⛈️';

    }
    else if(weather.includes('snow')){

        weatherIcon = '❄️';

    }
    else if(weather.includes('mist')){

        weatherIcon = '🌫️';

    }

    const trackTemp =
    Math.round(data.main.temp);

    const airTemp =
    Math.round(data.main.feels_like);

    const wind =
    Math.round(data.wind.speed);

    const humidity =
    data.main.humidity;

    document.querySelector('.weatherinfo:nth-child(2)').innerHTML =
    `${weatherIcon} ${weather.toUpperCase()}`;

    document.querySelector('.weatherinfo:nth-child(3)').innerHTML =
    `🌡️ Track Temp: ${trackTemp}°C`;

    document.querySelector('.weatherinfo:nth-child(4)').innerHTML =
    `🌬️ Air Temp: ${airTemp}°C`;

    document.querySelector('.weatherinfo:nth-child(5)').innerHTML =
    `💨 Wind: ${wind} km/h`;

    document.querySelector('.weatherinfo:nth-child(6)').innerHTML =
    `💧 Humidity: ${humidity}%`;

}

loadWeather();

setInterval(loadWeather, 60000);

function updateClock(){

    const now = new Date();

    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');

    document.getElementById('clock').textContent =
    `${h}:${m}:${s}`;

}

window.onload = () => {

    updateClock();

    setInterval(updateClock,1000);

};