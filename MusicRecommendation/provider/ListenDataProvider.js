var Listens = [];
var listenid = 0;

exports.Insert = function(listen) {
	var id = listenid++;
	listen.id = id;
	
	Listens.push(listen);
}

exports.Get = function() {
	return Listens;
}

