export default function logger(req, res, next) {
  console.log(`${new Date().toString()} ${req.method} ${req.originalUrl}`.inverse);
  next();
}
