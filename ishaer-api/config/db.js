require('dotenv').config();

const mongoose = require('mongoose');
const db = process.env.DB_URI

const connection = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB is connected..')
  }
  catch(error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connection;