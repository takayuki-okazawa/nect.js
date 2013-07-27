var http = require('http');
var server = http.createServer();

server.on('request', function(req,res){
  var data ='';
  req.on('data',function(chunk){
    data+=chunk;
  });
  req.on('end',function(){
    console.log('Body Echo:'+data+'\n');
    var str = "success!";
    res.writeHead(200,
    	{'Content-Length':Buffer.byteLength(str),
    	'Access-Control-Allow-Origin':'*',
    	'Content-Type':'text/plain',
    	'Connection':'close'
	});
	res.write(str);
  });
});

server.listen(8080,function(){console.log('port 8080 listen');});