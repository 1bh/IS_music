var Listens = [];
var listenid = 0;

exports.Insert = function(listen) {
	var id = listenid++;
	listen.id = id;
	
	Listens.push(listen);
	console.log(Listens);
	return listen;
}

exports.Query = function() {
	return Listens;
}

