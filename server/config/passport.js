import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Branch, Orderer, Restaurant } from '../config/sequelize.js';

export const jwtCallbackAdmin = async (jwtPayLoad, done) => {
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

export const jwtCallbackBranch = async (jwtPayLoad, done) => {
  try {
    const restaurant = await Restaurant.findByPk(jwtPayLoad.restaurantId, {
      attributes: { exclude: ['password'] },
    });

    const branch = await Branch.findOne({
      where: { id: jwtPayLoad.id, restaurantId: jwtPayLoad.restaurantId },
      attributes: { exclude: ['password'] },
    });

    if (restaurant && branch) {
      return done(null, {
        id: branch.id,
        email: branch.email,
        restaurantId: restaurant.id,
        restaurantEmail: restaurant.email,
      });
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};



export const jwtCallbackClient = async (jwtPayLoad, done) => {
  try {
    const client = await Orderer.findByPk(jwtPayLoad.phone, {
      attributes: { exclude: ['code'] },
    });

    if (client) {
      return done(null, {
        number: client.phone,
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

export const initializePassport = (app) => {
  app.use(passport.initialize());
  passport.use('admin-jwt', new JwtStrategy(jwtOptions, jwtCallbackAdmin));
  passport.use('client-jwt', new JwtStrategy(jwtOptions, jwtCallbackClient));
  passport.use('branch-jwt', new JwtStrategy(jwtOptions, jwtCallbackBranch));
};
