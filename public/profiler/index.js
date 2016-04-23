var socket = io();
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


//socket.on('connected users', function(msg) {
//    $('#user-container').html("");
//    for(var i = 0; i < msg.length; i++) {
//        //console.log(msg[i]+" )msg[i] == userId( "+userId);
//        if(msg[i] == userId)
//            $('#user-container').append($("<div id='" + msg[i] + "' class='my-circle'><span>"+msg[i]+"</span></div>"));
//        else
//            $('#user-container').append($("<div id='" + msg[i] + "' class='user-circle'><span>"+msg[i]+"</span></div>"));
//    }
//});

//socket.on('user connect', function(msg) {
//    if(userId === "user"){
//        console.log("Client side userId: "+msg);
//        userId = msg;
//    }
//});
//
//socket.on('user disconnect', function(msg) {
//    console.log("user disconnect: " + msg);
//    var element = '#'+msg;
//    console.log(element)
//    $(element).remove();
//});

window.onunload = function(e) {
    socket.emit("user disconnect", userId);
};
