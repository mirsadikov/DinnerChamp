import passport from 'passport';

const auth = (req, res, next) =>
  passport.authenticate('jwt', { session: false }, (err, restaurant) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    if (!restaurant) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.restaurant = restaurant;
    return next();
  })(req, res, next);

export default auth;
