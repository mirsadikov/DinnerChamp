import jwt from 'jsonwebtoken';
import { Branch, Restaurant } from '../config/sequelize.js';
import { getOrders, updateOrder } from '../controllers/order.controller.js';
import { resetOrderNumber, switchBranch } from '../controllers/branch.controller.js';

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
        const restaurantToken = jwt.verify(token, process.env.JWT_SECRET);

        const restaurant = await Restaurant.findByPk(restaurantToken.restaurantId, {
          attributes: { exclude: ['password'] },
        });

        const branch = await Branch.findOne({
          where: {
            restaurantId: restaurantToken.restaurantId,
            id: restaurantToken.branchId,
          },
          attributes: { exclude: ['password'] },
        });

        // no restaurant
        if (!restaurant) {
          return next(new Error('Restaurant not found'));
        }

        // no branch
        if (!branch) {
          return next(new Error('Branch not found'));
        }

        // add restaurantId to socket
        socket.restaurantId = restaurantToken.restaurantId;
        socket.branchId = restaurantToken.branchId;
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
      socket.emit('order:read', await getOrders(socket.restaurantId, socket.branchId, 24));
      // send resturant running property only
      socket.emit(
        'branch:read',
        await Branch.findByPk(socket.branchId, {
          attributes: ['running'],
        })
      );

      // listen to events
      socket.on('refresh', async () => {
        socket.emit(
          'branch:read',
          await Branch.findByPk(socket.branchId, {
            attributes: ['running'],
          })
        );
        socket.emit('order:read', await getOrders(socket.restaurantId, socket.branchId, 24));
      });
      socket.on('order:update', updateOrder);
      socket.on('branch:switch', async (newStatus) => {
        const branch = await switchBranch(socket.branchId, socket.restaurantId, newStatus);
        socket.emit('branch:read', branch);
      });
      socket.on('reset', () => resetOrderNumber(socket.branchId));
      socket.on('disconnect', () => console.log('Socket disconnected'.bgRed));
    });

    this.io.on('error', (err) => console.log(err.bgRed));
  }

  emit(event, data) {
    this.io.emit(event, data);
  }

  emitTo(restaurantId, branchId, event, data) {
    // filter by restaurantId and branchId
    this.io.sockets.sockets.forEach((socket) => {
      if (socket.restaurantId === restaurantId && socket.branchId === branchId) {
        socket.emit(event, data);
      }
    });
  }
}

const io = new IO();

export default io;
