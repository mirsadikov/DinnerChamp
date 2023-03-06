import 'colors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import app from './app.js';
import db from './config/sequelize.js';
import socket from './socket/socket.js';

// listen
const { PORT } = process.env;
if (!PORT) {
  throw new Error('PORT is not set!'.red);
}

try {
  await db.authenticate();
  console.log('Database connected'.bgGreen);
} catch (error) {
  console.error('Unable to connect to the database:'.red, error);
}

const httpServer = createServer(app);
socket.init(new SocketServer(httpServer));

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.bgBlue);
});
