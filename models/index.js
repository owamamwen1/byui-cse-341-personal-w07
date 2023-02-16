const dbConfig = require('../config/dbconfig.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.mongoose.set('strictQuery', true);
db.url = dbConfig.url;
db.faculty = require('./faculty.js')(mongoose);
db.user = require('./user.js')(mongoose);

module.exports = db;
