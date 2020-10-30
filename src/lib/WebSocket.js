const WebSocketServer = require('websocket').server;

class WebSocket
{
    async connect(server)
    {
        try {

            const webSocket = new WebSocketServer({
                httpServer: server
            });


            console.log(webSocket.config);

            

        } catch (error) {

        }
    }
}

export default new WebSocket();