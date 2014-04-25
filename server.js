var http = require("http")
, fs = require('fs')
, spawn = require('child_process').spawn
, prc = spawn('java',  ['-jar', 'VC0706.jar', 'COM3']);
//var exec = require('child_process').exec;

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
		res.write(content, "binary");
        res.end();
    });
	
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	  
 prc.stdout.on('data', function (data) {
var message_to_client = {
      image:data
      }
      socket.send(JSON.stringify(message_to_client)); 
	  console.log('SENDING');
 //ocket.emit('data', data );
 
}
  );
});
 // Quand on client se connecte, on lui envoie un message
   // socket.emit('message', 'Vous êtes bien connecté !');

server.listen(8080);


