const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE;

mongoose.connect(uri, { dbName })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  });

// Zamykanie połączenia z MongoDB przy zakończeniu działania aplikacji
// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed');
//   process.exit(0);
// });

module.exports = mongoose;