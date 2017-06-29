
module.exports = function(io, socket) {
	io.emit('chatMessage', {
		type: 'status',
		text: 'connected',
		created: Date.now(),
		username: socket.request.session.name
	});

	socket.on('chatMessage', function(message) {
		message.type = 'message';
		message.created = Date.now();
		message.username = socket.request.session.name;
		io.emit('chatMessage', message);
	});
		socket.on('disconnect', function() {
			io.emit('chatMessage', {
				type: 'status',
				text: 'disconnected',
				created: Date.now(),
				username: socket.request.session.name
			});
		});
	};
