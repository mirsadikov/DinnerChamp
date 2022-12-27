import 'colors';
import app from './app.js';
import db from './config/sequelize.js';

// listen
const { PORT } = process.env;
if (!PORT) {
  throw new Error('PORT is not set!'.red);
}

try {
  await db.authenticate();
  console.log('Database connected'.bgGreen);
} catch (error) {
  console.error('Unable to connect to the database:'.red, error);
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.blue.inverse);
});
