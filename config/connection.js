const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const connection = async () => {

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('DB CONNECTED');
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connection;

