const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch(console.error);

module.exports = mongoose;
