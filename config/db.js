const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

module.exports = connectdb;
