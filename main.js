//
//
//var http = require('http');
//var express = require('express');
////var routes = require('./routes');
////var user = require('./routes/user');
//var path = require('path');
//
////var favicon = require('serve-favicon');
//var logger = require('morgan');
//var methodOverride = require('method-override');
////var session = require('express-session');
//var bodyParser = require('body-parser');
//var multer = require('multer');
//var errorHandler = require('errorhandler');
//
//var app = express();
//var serveIndex = require('serve-index'); 
//
//// all environments
//app.set('port', process.env.PORT || 5000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
////app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
//app.use(methodOverride());
////app.use(session({ resave: true,
////                  saveUninitialized: true,
////                  secret: 'uwotm8' }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());
////app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/ftp', serveIndex('public/ftp', {'icons': true, 'view': 'details'}));
//
////app.get('/', routes.index);
////app.get('/users', user.list);
////
//// error handling middleware should be loaded after the loading the routes
//if ('development' == app.get('env')) {
//  app.use(errorHandler());
//}
//
//////////////////////////////////////////
var express    = require('express');
var serveIndex = require('serve-index');
var http = require('http');
var path = require('path');
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");

var app             = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
//app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));
// Serve URLs like /ftp/thing as public/ftp/thing
app.use('/ftp', serveIndex(path.join(__dirname,'public/ftp'), {'icons': true}));
//app.listen()
/////////////////////////////////
///**
// * Module dependencies.
// */
//var express = require('express');
//var http = require('http');
//var path = require('path');
//var app = express();
//var serveIndex = require('serve-index');
//
//// all environments
//app.set('port', process.env.PORT || 5000);
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.set('view engine', 'ejs');
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/ftp', serveIndex('public/ftp', {'icons': true, 'view': 'details'}));
//
//
//// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var datafileName = '/var/volatile/datalog';
//var datafileName = '/home/qingping/filetotail';
Tail = require('tail').Tail;
tail = new Tail(datafileName);
tail.on("error", function(error) {
  console.log('nodetailERROR: ', error);
});

   var io = require('socket.io').listen(8000); // server listens for socket.io communication at port 8000
 //  io.set('log level', 1); // disables debugging. this is optional. you may remove it if desired.


   io.sockets.on('connection', function (socket) {
       // If socket.io receives message from the client browser then
       // this call back will be executed.
       socket.on('message', function (msg) {
           console.log(msg);
       });
       // If a web browser disconnects from Socket.IO then this callback is called.
       socket.on('disconnect', function () {
           console.log('disconnected');
       });
   });


tail.on("line", function(data) {
 io.sockets.emit('message', data);
  console.log('msg:' + data);
});



