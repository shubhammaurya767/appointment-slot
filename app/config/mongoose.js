const mongoose = require('mongoose');

//providing connection to DB
mongoose.connect('mongodb://localhost/hms');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongoDB"));

db.once('open',function(){
    console.log('Connected to database:: MongoDB');
});

module.exports =db;