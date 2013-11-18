var net = require('net');
var tls = require('tls');

var handleConnection = require('./handleConnection');

module.exports.TCP = 0;
module.exports.TLS = 1;

// to-do: research connection making

function Connection(ip, port){
	this.ip = ip;
	this.port = port;
}

function TLSServer(port, key, cert){
	this.port = port;
	this.key = key;
	this.cert = cert;

	tls.createServer({
		key: key,
		cert: cert
	}, handleConnection);
}


module.exports.Connection = Connection;
