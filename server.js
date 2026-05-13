const WebSocket = require('ws');
const express = require('express');

const app = express();

app.use(express.static(__dirname));

let latestCars = [];

let sessionInfo = {

    session:'RACE',

    timeRemaining:'00:00:00',

    trackState:'GREEN'

};

const ws =
new WebSocket('wss://livetiming.azurewebsites.net');

ws.on('open', () => {

    console.log('🔥 Connected');

    ws.send(JSON.stringify({

        eventId:"50",

        eventPid:[0,4],

        clientLocalTime:Date.now()

    }));

});

ws.on('message', (data) => {

    try{

        const json =
        JSON.parse(data.toString());

        // LIVE CARS

        if(Array.isArray(json.RC)){

            latestCars = json.RC;

            console.clear();

            console.log(
                `🏎️ Cars Loaded: ${latestCars.length}`
            );

        }

        // SESSION INFO

        if(json.TRACKSTATE){

            sessionInfo.trackState =
            json.TRACKSTATE;

        }

    }
    catch(error){

        console.log(
            '❌ Parse Error:',
            error.message
        );

    }

});

ws.on('error', (error) => {

    console.log(
        '❌ Error:',
        error.message
    );

});

ws.on('close', () => {

    console.log(
        '⚠️ Closed'
    );

});

app.get('/api/timing', (req,res)=>{

    res.setHeader(
        'Cache-Control',
        'no-store'
    );

    res.json(latestCars);

});

app.get('/api/session', (req,res)=>{

    res.setHeader(
        'Cache-Control',
        'no-store'
    );

    res.json(sessionInfo);

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, ()=>{

    console.log(
        `🚀 Running on ${PORT}`
    );

});