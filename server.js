const WebSocket = require('ws');
const express = require('express');

const app = express();

app.use(express.static(__dirname));

let latestCars = [];

const ws = new WebSocket('wss://livetiming.azurewebsites.net');

ws.on('open', () => {

    console.log('🔥 Connected');

    ws.send(JSON.stringify({
        eventId: "50",
        eventPid: [0,4],
        clientLocalTime: Date.now()
    }));

});

ws.on('message', (data) => {

    const text = data.toString();

    if(text.includes('STX') || text.includes('STY')){

        console.log(text);

    }

    try {

        const json = JSON.parse(text);

        if(Array.isArray(json.RC)){

            latestCars = json.RC;

            console.clear();

            console.log('🏎️ Cars Loaded:', latestCars.length);

        }

    } catch(e){}

});
app.get('/api/timing', (req,res)=>{

    res.json(latestCars);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', ()=>{

    console.log(`🚀 Running on port ${PORT}`);

});
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
