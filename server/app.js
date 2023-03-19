import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
// config
import './config/env.js';
import { initializePassport } from './config/passport.js';
// middlewares
import logger from './utils/logger.js';
import notFound from './middlewares/notfound.middleware.js';
import errorHandler from './middlewares/errorhandler.middleware.js';
// routes
import restaurantRoute from './routes/restaurant.route.js';
import dishRoute from './routes/dish.route.js';
import categoryRoute from './routes/category.route.js';
import orderRoute from './routes/order.route.js';
import clientRoute from './routes/client.route.js';

// config
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(fileUpload());
initializePassport(app);

// routes
app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.use('/api/restaurant', restaurantRoute);
app.use('/api/dish', dishRoute);
app.use('/api/category', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/client', clientRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
