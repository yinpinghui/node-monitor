var cronJob = require('cron').CronJob;
var spawn = require('child_process').spawn;
var app = require("../app");
var logger = app.get("logger");
var Job = function(){
	this.myid = "";
	this.name = "";
	this.startcmd = "";
	this.stopcmd = "";
	this.desc = "";
	this.type = "" ; //监控，部署，打包，
	this.status = "stop";
	this.crontime = "";
	this.swither = null;
	this.crontype = 'once';
}

Job.prototype.run = function(){
	var self = this;
	var _cmd = spawn(startcmd, []);
	var _stopcmd = spawn(stopcmd,[]);
	if (this.crontype === 'once'){
		this.rundetail(_cmd, this.name + " start ");
	}else{
		this.swither = new cron.CronJob(this.crontime, 
			function() {
				// Runs every xxx time
		    	this.rundetail(_cmd ,this.name + " start regularly ");
		    }, function(){
		    	// This function is executed when the job stops
		    	//this.rundetail(_stopcmd, this.name + " stop ");
		    	logger.info(this.name + " cron stop");
		    }, 
		    true /* Start the job right now */
		);
	}
	
}
Job.prototype.close = function(){
	this.swither.stop();
}
Job.prototype.rundetail = function(_cmd){
	_cmd.stdout.on('data', function (data) {
		logger.info(_self.name + " begin ....");
	});
	
	_cmd.stderr.on('data', function (data) {
	  logger.error(_self.name + " failed! error stack is " + data);
	});
	
	_cmd.on('close', function (code) {
	  if (code !== 0) {
	    logger.error(_self.name + ' process exited with code ' + code);
	  }
	  logger.info(_self.name + " done!");
	});
}
