const express = require("express");
const app = express();
const server = app.listen(8080);

var path = require("path");
const io = require("socket.io")(server);

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/cu.usbmodem1411", {
    baudRate: 9600
});

//expose the local public folder for inluding files js, css etc..
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/iot.html');
});

const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

parser.on("data", function(data) {
    io.sockets.emit("data", data);
    console.log(data);
});


        io.on('connection', function(socket) {
           socket.on('data', function(data) {
            console.log(data);
           

           });
        });
        
        io.on('error', function() {
            console.error(arguments)
        });