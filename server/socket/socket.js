import jwt from 'jsonwebtoken';

class IO {
  init(io) {
    this.io = io;
    this.applyMiddlewares();
    this.listen();
  }

  // middlewares
  applyMiddlewares() {
    this.io.use((socket, next) => {
      const bearerToken = socket.handshake.auth.token;
      const token = bearerToken && bearerToken.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication error: no token provided'));
      }

      try {
        const restaurant = jwt.verify(token, process.env.JWT_SECRET);

        socket.restaurantId = restaurant.id;
        next();
      } catch (err) {
        return next(new Error('Authentication error: invalid token'));
      }
    });
  }

  // events
  listen() {
    this.io.on('connection', (socket) => {
      console.log('New socket'.bgYellow);

      socket.on('disconnect', () => console.log('Socket disconnected'.bgRed));
    });

    this.io.on('error', (err) => console.log(err.bgRed));
  }

  emit(event, data) {
    this.io.emit(event, data);
  }

  emitTo(clientId, event, data) {
    // filter by restaurantId
    this.io.sockets.sockets.forEach((socket) => {
      if (socket.restaurantId === clientId) {
        socket.emit(event, data);
      }
    });
  }
}

const io = new IO();

export default io;
