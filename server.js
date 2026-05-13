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
        eventPid:[0,1,2,3,4,5,6,7,8],
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

        console.log(json);

        const cars =

    json.RC ||
    json.R ||
    json.CARS ||
    json.cars;

if(cars && Array.isArray(cars)){

    latestCars = cars;

    console.clear();

    console.log(
        `🏎️ Cars Loaded: ${latestCars.length}`
    );

    console.log(cars[0]);

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
