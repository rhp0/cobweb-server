//NOTE PITFALL: not all of these gpio numbers will work if the edison is plugged into the intel arduino board
//somehow, it knows what it is plugged into and throws "Illegal arguments for construction of _exports_Gpio"

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

var motorBpwm = new mraa.Gpio(20); //12
motorBpwm.dir(mraa.DIR_OUT);
var motorBin2 = new mraa.Gpio(46); //47
motorBin2.dir(mraa.DIR_OUT);
var motorBin1 = new mraa.Gpio(33); //48
motorBin1.dir(mraa.DIR_OUT);

var motorApwm = new mraa.Gpio(14); //gp13 on sparkfun block
motorApwm.dir(mraa.DIR_OUT);
var motorAin1 = new mraa.Gpio(48); //gp15
motorAin1.dir(mraa.DIR_OUT);
var motorAin2 = new mraa.Gpio(36); //gp14
motorAin2.dir(mraa.DIR_OUT);
var motorStdby = new mraa.Gpio(47); //gp49
motorStdby.dir(mraa.DIR_OUT);

var motorAstate = 0; //int to hold the state of motorA
var motorBstate = 0; //int to hold the state of motorB

var serveIndex = require('serve-index');
var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/ftp', serveIndex(path.join(__dirname,'public/ftp'), {'icons': true, 'view': 'details'}));
app.set('port', process.env.PORT || 5000);

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

//var bodyParser      = require("body-parser");
//var methodOverride  = require("method-override");
////app.use(bodyParser());
//app.use(methodOverride());

//// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}


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


//Socket.io Event handlers
io.on('connection', function(socket) {
    console.log('a user connected: ');
    io.emit('user connect');

    socket.on('user disconnect', function(msg) {
        console.log('remove: ' + msg);
        io.emit('user disconnect', msg);
    });

    socket.on('toggle up', function(msg) {
        switch(motorAstate){
            case 0:
            case -1:
                    motorAin1.write(1);
                    motorAin2.write(0);
                    motorApwm.write(1);
                    motorStdby.write(1);
                    motorAstate = 1;
                    break;
            case 1:
                    motorAin1.write(0);
                    motorAin2.write(0);
                    motorApwm.write(0);
                    motorStdby.write(0);
                    motorAstate = 0;
                    break;
        }
        msg.value = motorAstate;
        io.emit('toggle up', msg);
        console.log(motorAstate)
    });
    socket.on('toggle down', function(msg) {
        switch(motorAstate){
            case 0:
            case 1:
                    motorAin1.write(0);
                    motorAin2.write(1);
                    motorApwm.write(1);
                    motorStdby.write(1);
                    motorAstate = -1;
                    break;
            case -1:
                    motorAin1.write(0);
                    motorAin2.write(0);
                    motorApwm.write(0);
                    motorStdby.write(0);
                    motorAstate = 0;
                    break;
        }
        msg.value = motorAstate;
        io.emit('toggle down', msg);
        console.log(motorAstate)
    });

    socket.on('toggle air', function(msg) {
        switch(motorBstate){
            case 0:
                    motorBin1.write(0);
                    motorBin2.write(1);
                    motorBpwm.write(1);
                    motorStdby.write(1);
                    motorBstate = 1;
                    break;
            case 1:
                    motorBin1.write(0);
                    motorBin2.write(0);
                    motorBpwm.write(0);
                    motorStdby.write(0);
                    motorBstate = 0;
                    break;
        }
        msg.value = motorBstate;
        io.emit('toggle air', msg);
        console.log("air " + motorBstate)
    });

});


tail.on("line", function(data) {
 io.sockets.emit('message', data);
  console.log('msg:' + data);
});

