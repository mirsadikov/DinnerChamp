import jwt from 'jsonwebtoken';

const generateToken = (payload, expiresIn) =>
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    expiresIn === '-1' ? null : { expiresIn: expiresIn || process.env.JWT_EXPIRES_IN }
  );

export default generateToken;
