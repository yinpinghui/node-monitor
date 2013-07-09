/**
 * Module dependencies.
 */

var express = require('express.io'), 
routes = require('./routes'), 
http = require('http'), 
path = require('path');
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('db/monitor.db');
module.exports =  app = express();
var winston = require("winston");

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: __dirname +  '/log/app.log' }),
      new (winston.transports.Webhook)({ 'host': '127.0.0.1', 'port': 3001, 'path': '/*' })
    ]
    /*,
     exceptionHandlers: [
      new winston.transports.File({ filename: __dirname + '/log/exceptions.log' })
    ]*/
});
// all environments
app.set("logger",logger);
app.set('port', process.env.PORT || 3001);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.set("root",__dirname);
app.set("sqlite",db);
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.bodyParser({
	uploadDir: __dirname + '/public/tmp',
    keepExtensions: true
}));
app.use(express.limit('500mb'));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
require("./routes/index.js")(app);
require("./task")(app);

http.createServer(app).listen(app.get('port'), function() {
	//console.log(logger);
	logger.info('Express server listening on port ' + app.get('port'));
});
