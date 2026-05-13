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

    console.log('🔥 Connected to Live Timing');

    ws.send(JSON.stringify({

        eventId:"50",

        eventPid:[0,4],

        clientLocalTime:Date.now()

    }));

});

ws.on('message', (data) => {

    const text =
    data.toString();

    try{

        const json =
        JSON.parse(text);

        if(Array.isArray(json.RC)){

            latestCars =
            json.RC;

            console.clear();

            console.log(
                `🏎️ Cars Loaded: ${latestCars.length}`
            );

        }

        if(json.STA){

            sessionInfo.trackState =
            json.STA;

        }

        if(json.RT){

            sessionInfo.timeRemaining =
            json.RT;

        }

        if(json.SN){

            sessionInfo.session =
            json.SN;

        }

    }
    catch(error){

        // ignore invalid packets

    }

});

ws.on('error', (error) => {

    console.log(
        '❌ WebSocket Error:',
        error.message
    );

});

ws.on('close', () => {

    console.log(
        '⚠️ Connection Closed'
    );

});

app.get('/api/timing', (req,res) => {

    res.json(latestCars);

});

app.get('/api/session', (req,res) => {

    res.json(sessionInfo);

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,'0.0.0.0',() => {

    console.log(
        `🚀 Running on port ${PORT}`
    );

});