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

    try {

        const json = JSON.parse(text);

        // DATOS DE CARROS
        if(Array.isArray(json.RC)){

            latestCars = json.RC;

            console.clear();

            console.log('🏁 Cars Loaded:', latestCars.length);

        }

    } catch(e){}

});

app.get('/api/timing', (req,res)=>{

    res.json(latestCars);

});

app.listen(3000, ()=>{

    console.log('🚀 Overlay running on http://localhost:3000');

});