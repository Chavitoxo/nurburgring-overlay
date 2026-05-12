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

    const temp =
    Math.round(data.main.temp);

    const wind =
    Math.round(data.wind.speed);

    const humidity =
    data.main.humidity;

    document.querySelector('.weatherinfo:nth-child(5)').innerHTML =
    `💧 Humidity: ${humidity}%`;

    document.querySelector('.weatherinfo:nth-child(2)').innerHTML =
   `🌤️ ${weather.toUpperCase()}`;

    document.querySelector('.weatherinfo:nth-child(3)').innerHTML =
    `🌡️ Track Temp: ${temp}°C`;

    document.querySelector('.weatherinfo:nth-child(4)').innerHTML =
    `💨 Wind: ${wind} km/h`;

}

loadWeather();

setInterval(loadWeather, 60000);

function updateClock(){

    const now = new Date();

    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');

    document.getElementById('clock').innerText =
    `${h}:${m}:${s}`;

}

setInterval(updateClock,1000);

updateClock();

const dotsContainer =
document.getElementById('trackdots');

const fakeCars = [];

for(let i = 0; i < 5; i++){

    const dot = document.createElement('div');

    dot.className = 'dot';

    dotsContainer.appendChild(dot);

    fakeCars.push({

        el:dot,

        angle:Math.random() * 360,

        radius:70 + Math.random() * 40

    });

}

function animateFakeCars(){

    fakeCars.forEach(car => {

        car.angle += 0.8;

        const x =
        120 +
        Math.cos(car.angle * Math.PI/180)
        * car.radius;

        const y =
        120 +
        Math.sin(car.angle * Math.PI/180)
        * car.radius;

        car.el.style.left = `${x}px`;

        car.el.style.top = `${y}px`;

    });

}

setInterval(animateFakeCars, 30);