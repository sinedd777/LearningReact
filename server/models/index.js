const mongoose = require ('mongoose');

mongoose.set('debug',true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://gaurang:fUvVtVPUf3vqL4hm@cluster0-xkmls.mongodb.net/test?retryWrites=true&w=majority');

module.exports.User = require('./user');
module.exports.Poll =  require('./poll');
