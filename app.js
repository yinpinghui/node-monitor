/**
 * Module dependencies.
 */

var express = require('express.io'), 
routes = require('./routes'), 
http = require('http'), 
path = require('path');

var app = express();

// all environments

app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
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

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
