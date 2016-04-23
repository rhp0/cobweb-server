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
app.use('/ftp', serveIndex(path.join(__dirname,'public/ftp'), {'icons': true}));
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
       //socket.on('message', function (msg) { console.log(msg); });
       // If a web browser disconnects from Socket.IO then this callback is called.
       socket.on('disconnect', function () {
           console.log('disconnected');
       });
   });


tail.on("line", function(data) {
 io.sockets.emit('message', data);
  console.log('msg:' + data);
});



