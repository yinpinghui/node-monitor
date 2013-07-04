var spawn = require('child_process').spawn
//ping    = spawn('ls', ['-lh', '/usr']);
//var lite = require('iconv-lite')
module.exports = function(target){
	//var content = new iconv('gbk','UTF-8//TRANSLIT//IGNORE').convert(new Buffer(body,'binary')).toString()
	var ping = spawn("ping",["-c","5",target]);
	ping.stderr.setEncoding('utf8');
	ping.stdout.on('data', function (data) {
	  console.log('' + data);
	});
	ping.stderr.on('data', function (data) {
	  if (/^execvp\(\)/.test(data)) {
	    console.log('Failed to start child process.');
	  }
	});
}
 