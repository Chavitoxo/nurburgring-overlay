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

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', ()=>{

    console.log(`🚀 Running on port ${PORT}`);

});