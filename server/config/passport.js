import { ExtractJwt } from 'passport-jwt';
import { Restaurant } from '../config/sequelize.js';

export const jwtCallback = async (jwtPayLoad, done) => {
  try {
    const restaurant = await Restaurant.findByPk(jwtPayLoad.id, {
      attributes: { exclude: ['password'] },
    });

    if (restaurant) {
      return done(null, {
        id: restaurant.id,
        email: restaurant.email,
      });
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
