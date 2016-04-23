//var http = location.protocol;
//var slashes = http.concat("//");
//var host = slashes.concat(window.location.hostname);
//var hostport = host.concat(":8000");

var socket = io();//(hostport);
var userId = "user";



$("#up-link").on('click', function(e){
    socket.emit('toggle up', {value: 0, userId: userId});
});
$("#down-link").on('click', function(e){
    socket.emit('toggle down', {value: 0, userId: userId});
});
$("#air-link").on('click', function(e){
    socket.emit('toggle air', {value: 0, userId: userId});
});

socket.on('toggle up', function(msg) {
    if(msg.value === 0) {
        if($("#led-container").hasClass("up")) $("#led-container").removeClass("up");
        if($("#led-container").hasClass("down")) $("#led-container").removeClass("down");
        $("#led-container").addClass("off");
        $("#led-container span").text("OFF");
        console.log("off")
    }
    else if(msg.value === 1) {
        $("#led-container").addClass("up");
        if($("#led-container").hasClass("down")) $("#led-container").removeClass("down");
        if($("#led-container").hasClass("off")) $("#led-container").removeClass("off");
        $("#led-container span").text("UP");
        console.log("up")
    }
});

socket.on('toggle down', function(msg) {
    if(msg.value === 0) {
        $("#led-container").removeClass("up");
        $("#led-container").removeClass("down");
        $("#led-container").addClass("off");
        console.log("off")
        $("#led-container span").text("OFF");
    }
    else if(msg.value === -1) {
        $("#led-container").removeClass("up");
        $("#led-container").addClass("down");
        $("#led-container").removeClass("off");
        $("#led-container span").text("DOWN");
        console.log("down")
    }
});
socket.on('toggle air', function(msg) {
    if(msg.value === 0) {
        $("#air-container").removeClass("on");
        $("#air-container").addClass("off");
        console.log("airoff")
        $("#air-container span").text("OFF");
    }
    else if(msg.value === 1) {
        $("#air-container").addClass("on");
        $("#air-container").removeClass("off");
        $("#air-container span").text("ON");
        console.log("airon")
    }
});


window.onunload = function(e) {
    socket.emit("user disconnect", userId);
};



// Initialize Flot data points
var totalPoints = 300;
var r = [];
var g = [];
var b = [];
var c = [];
function getInitData(res) {
    for (i=0;i<totalPoints;i++) res[i]=[Number.NaN,Number.NaN];
    return res;
}

//$(document).ready(function(){
    var plot = $.plot($("#placeholder1"), [
        {color: '#FF0000', data: getInitData(r)},
        {color: '#00FF00', data: getInitData(g)},
        {color: '#0000FF', data: getInitData(b)},
        {color: '#808080', data: getInitData(c)}
    ],
    {
        series: {shadowSize: 0},
                        //     yaxis: {min: null, max: null},
                        //xaxis: { min: 0, max: 300}
    });

 //   socket.on('connect', function () {
        socket.on('message', function (msg) {
            var vals = msg.substring(msg.indexOf('[') + 1,msg.indexOf(']') - 1).split(',');
            console.log(vals[3] +' ' + vals[5]);
             // Push new value to Flot Plot
            var d=parseFloat(vals[3]); //3 is armang, 4 is pressure
            r.push([d, parseFloat(vals[5])]); // push on the end side
            r.shift(); // remove first value to maintain 300 points
            g.push([d, parseFloat(vals[6])]); // push on the end side
            g.shift(); // remove first value to maintain 300 points
            b.push([d, parseFloat(vals[7])]); // push on the end side
            b.shift(); // remove first value to maintain 300 points
            c.push([d, parseFloat(vals[8])]); // push on the end side
            c.shift(); // remove first value to maintain 300 points
            // Redraw the plot
            plot.setData([
                {color: '#FF0000', data: r},
                {color: '#00FF00', data: g},
                {color: '#0000FF', data: b},
                {color: '#808080', data: c}
            ]);
            plot.setupGrid();
            plot.draw();


        });



