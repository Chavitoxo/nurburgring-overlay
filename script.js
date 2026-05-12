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

    const temp =
    Math.round(data.main.temp);

    const wind =
    Math.round(data.wind.speed);

    const humidity =
    data.main.humidity;

    document.querySelector('.weatherinfo:nth-child(2)').innerHTML =
    `${weatherIcon} ${weather.toUpperCase()}`;

    document.querySelector('.weatherinfo:nth-child(3)').innerHTML =
    `🌡️ Track Temp: ${temp}°C`;

    document.querySelector('.weatherinfo:nth-child(4)').innerHTML =
    `💨 Wind: ${wind} km/h`;

    document.querySelector('.weatherinfo:nth-child(5)').innerHTML =
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

const trackPoints = [

    {x:195,y:78},
    {x:170,y:95},
    {x:145,y:125},
    {x:135,y:165},
    {x:128,y:210},
    {x:138,y:255},
    {x:160,y:295},
    {x:195,y:330},
    {x:240,y:355},
    {x:285,y:365},
    {x:320,y:350},
    {x:345,y:320},
    {x:365,y:290},
    {x:395,y:265},
    {x:430,y:245},
    {x:470,y:220},
    {x:510,y:195},
    {x:550,y:170},
    {x:590,y:145},
    {x:625,y:120},
    {x:655,y:98},
    {x:690,y:88},
    {x:715,y:100},
    {x:725,y:130},
    {x:710,y:165},
    {x:685,y:195},
    {x:650,y:220},
    {x:610,y:230},
    {x:570,y:225},
    {x:535,y:210},
    {x:510,y:195},
    {x:490,y:220},
    {x:495,y:255},
    {x:520,y:280},
    {x:555,y:285},
    {x:595,y:270},
    {x:630,y:245},
    {x:660,y:215},
    {x:690,y:180},
    {x:710,y:140}

];

const dotsContainer =
document.getElementById('trackdots');

const fakeCars = [];

for(let i = 0; i < 8; i++){

    const dot = document.createElement('div');

    dot.className = 'dot';

    dotsContainer.appendChild(dot);

    fakeCars.push({

        el:dot,

        progress:i * 5

    });

}

function animateFakeCars(){

    fakeCars.forEach(car => {

        car.progress += 0.08;

        if(car.progress >= trackPoints.length){

            car.progress = 0;

        }

        const index =
        Math.floor(car.progress);

        const nextIndex =
        (index + 1) % trackPoints.length;

        const p1 =
        trackPoints[index];

        const p2 =
        trackPoints[nextIndex];

        const t =
        car.progress - index;

        const x =
        p1.x + (p2.x - p1.x) * t;

        const y =
        p1.y + (p2.y - p1.y) * t;

        car.el.style.left =
        `${x}px`;

        car.el.style.top =
        `${y}px`;

    });

}

setInterval(animateFakeCars,16);