const WebSocketServer = require('websocket').server;

class WebSocket
{
    constructor()
    {
        this.webSocket = [];
        this.connect();
    }

    async connect()
    {

        try {

            this.webSocket = new WebSocketServer({
                httpServer: 'http://localhost:3011'
            });

        } catch (error) {

        }
    }
}

export default new WebSocket();