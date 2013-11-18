function log(msg){ console.log(msg); }


function handleConnection(conn){
	// assuming conn to be a native node.js connection for the moment

	log("New Connection");

	conn.on('data', function(d){
		log("Data");
		log(d);
		log(d.toString());
		log("--END--");
	});

	conn.on('end', function(){
		// connection dropped
		log("Connection dropped");
	});

}

module.exports = handleConnection;
