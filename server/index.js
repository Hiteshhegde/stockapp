const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9080 });

wss.on("connection", ws => {
    console.log('New Connection');
    ws.on("message", (data)=> {
        console.log(data);
        ws.send(`${data}`);

    })
    ws.on("close", () => {
        console.log("Dis Connected");
    });
});


