const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('App connected to the database successfully.');
  } catch (error) {
    console.log('Unable to connect to the database.');
    process.exit(1);
  }
};
