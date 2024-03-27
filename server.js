var app = require('express')();
var http = require('http').Server(app);

// load html

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// web server
var port = process.env.PORT || 1337;
http.listen(port, function () {
    console.log('listening web server');
}); 