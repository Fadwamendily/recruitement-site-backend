//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/emploi'; 
mongoose.connect(mongoDB,{ useNewUrlParser: true ,useUnifiedTopology: true , useFindAndModify : true});


mongoose.Promise = global.Promise;
module.exports = mongoose;

