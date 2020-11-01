import 'dotenv/config';

import app from './app';

import libWebSocket from './lib/WebSocket';

app.listen(process.env.PORT);

const obj = new libWebSocket();
obj.connect(app);
