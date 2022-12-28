import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import fileUpload from 'express-fileupload';
// config
import './config/env.js';
import { jwtCallback, jwtOptions } from './config/passport.js';
// middlewares
import logger from './utils/logger.js';
import notFound from './middlewares/notfound.middleware.js';
import errorHandler from './middlewares/errorhandler.middleware.js';
// routes
import restaurantRoute from './routes/restaurant.route.js';
import dishRoute from './routes/dish.route.js';

// config
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(fileUpload()); 
app.use(passport.initialize());
passport.use(new JwtStrategy(jwtOptions, jwtCallback));

// routes
app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.use('/api/restaurant', restaurantRoute);
app.use('/api/dish', dishRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
