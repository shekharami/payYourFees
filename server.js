const dotenv = require('dotenv');

const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({path: './config.env'})

// app.all('*', (req, res) =>{
//     res.send('hello frrom server');
// })

const DB = (process.env.DATABASE/*+'&W=majority'*/)//.replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    // console.log(con.connections);
    console.log("db connection successful");
});
const port = process.env.PORT || 3000 ;
const server = app.listen(port, () =>{
    console.log(`Server listening at port ${port}`);
});

process.on('unhandledRejection', (err)=>{
    console.log( err.name, err.message);
    console.log('Unhandled rejection... SHUTTING DOWN!');
    server.close(()=>{
        process.exit(1);// 0 for success, 1 for fail
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM Recieved. Shutting down gracefully.');
    server.close(() => {
        console.log('Process Terminated');
    });
})
