const dotenv = require('dotenv');

const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: './config.env' });

const config = require('config');

// app.all('*', (req, res) =>{
//     res.send('hello frrom server');
// })

const DB = (config.get('database.url') + '&W=majority').replace(
  '<DATABASE_PASSWORD>',
  config.get('database.password')
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('db connection successful');
  });
const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection... SHUTTING DOWN!');
  server.close(() => {
    process.exit(1); // 0 for success, 1 for fail
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM Recieved. Shutting down gracefully.');
  server.close(() => {
    console.log('Process Terminated');
  });
});
