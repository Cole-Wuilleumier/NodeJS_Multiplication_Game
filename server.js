var express = require('express');  
var app = express();  
var session = require('express-session');


var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public/libs/angular'));
app.use(express.static(__dirname + '/public/libs/'));
app.use(express.static(__dirname + '/public/'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var sessionMiddleware = session({
	cookieName:'session',
	secret: 'superSecret',
	resave: true,
	saveUninitialized: true
});
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(sessionMiddleware);
app.get("/login", function(req, res){
    req.session // Session object in a normal request
});


app.set('views', './app/views');
app.set('view engine', 'ejs');

var index = require('./app/controllers/index.server.controller');

app.get('/', index.render);

require('./app/routes/user.server.routes.js')(app);

var current_users = [];
io.on('connection', function(socket) {
	if(socket.request.session.name != ""){
		require('./app/controllers/multi.server.controller')(io, socket, current_users);
	}	
});

server.listen(3000);  
console.log("Server running on 3000");
