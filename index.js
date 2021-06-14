//include express
var express = require('express');
//create an express application
var app = express();
//define a route on `/hello/world`
app.get('/hello/worlds', function(request, response) {
 console.log('got request for "/hello/world"');
 response.send('hello there and hello there indeed!');
});
//have the application listen on a specific port
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});