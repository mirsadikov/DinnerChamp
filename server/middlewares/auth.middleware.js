import passport from 'passport';

const authAdmin = (req, res, next) =>
  passport.authenticate('admin-jwt', { session: false }, (err, restaurant) => {
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

const authBranch = (req, res, next) =>
  passport.authenticate('branch-jwt', { session: false }, (err, branch) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    if (!branch) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.branch = branch;
    return next();
  })(req, res, next);

const authClient = (req, res, next) => 
  passport.authenticate('client-jwt', { session: false }, (err, client) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    if (!client) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.orderer = client;
    return next();
  })(req, res, next);

export { authAdmin, authClient, authBranch };
