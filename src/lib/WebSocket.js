import express from 'express';
import socket from 'socket.io';

class WebSocket
{
    constructor()
    {
        this.server = express();

        //this.connect();
    }
    connect()
    {
        try {

            const io = socket(this.server);

            io.on('connection', socket =>
            {
                socket.on('status-requests', data =>
                {

                });
                console.log('Server run backend start websocket')

                socket.on('disconnect', data =>
                {
                    console.log('Server disconnected')
                });
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export default new WebSocket().server;