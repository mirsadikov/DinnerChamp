import jwt from 'jsonwebtoken';
import { Restaurant } from '../config/sequelize.js';
import { getOrders, updateOrder } from '../controllers/order.controller.js';
import { switchRestaurant } from '../controllers/restaurant.controller.js';

class IO {
  init(io) {
    this.io = io;
    this.applyMiddlewares();
    this.listen();
  }

  // middlewares
  applyMiddlewares() {
    this.io.use(async (socket, next) => {
      const bearerToken = socket.handshake.auth.token;
      const token = bearerToken && bearerToken.split(' ')[1];

      // no token
      if (!token) {
        return next(new Error('Authentication error: no token provided'));
      }

      try {
        // verify token
        const restaurantSocket = jwt.verify(token, process.env.JWT_SECRET);

        const restaurant = await Restaurant.findByPk(restaurantSocket.restaurantId, {
          attributes: { exclude: ['password'] },
        });

        // no restaurant
        if (!restaurant) {
          return next(new Error('Restaurant not found'));
        }

        // add restaurantId to socket
        socket.restaurantId = restaurantSocket.restaurantId;
        next();
      } catch (err) {
        return next(new Error('Authentication error: invalid token'));
      }
    });
  }

  // events
  listen() {
    this.io.on('connection', async (socket) => {
      console.log('New socket'.bgYellow);

      // initial data
      socket.emit('order:read', await getOrders(socket.restaurantId, 24));
      // send resturant running property only
      socket.emit(
        'restaurant:read',
        await Restaurant.findByPk(socket.restaurantId, {
          attributes: ['running'],
        })
      );

      // listen to events
      socket.on('refresh', async () => {
        socket.emit(
          'restaurant:read',
          await Restaurant.findByPk(socket.restaurantId, {
            attributes: ['running'],
          })
        );
        socket.emit('order:read', await getOrders(socket.restaurantId, 24));
      });
      socket.on('order:update', updateOrder);
      socket.on('restaurant:switch', async (newStatus) => {
        const restaurant = await switchRestaurant(socket.restaurantId, newStatus);
        socket.emit('restaurant:read', restaurant);
      });
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
