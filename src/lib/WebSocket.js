const WebSocketServer = require('websocket').server;

class WebSocket
{
    async connect(server)
    {
        try {

            this.webSocket = new WebSocketServer({
                httpServer: server
            });

            console.log(this.webSocket);

        } catch (error) {

        }
    }
}

export default new WebSocket();