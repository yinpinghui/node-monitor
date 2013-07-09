var _ = require("underscore");
var Job = require("./Job");
var loadtask = function(app) {
	var db = app.get("sqlite");
	app.alltask = {};
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS task (myid TEXT, name TEXT, startcmd TEXT,stopcmd TEXT, desc TEXT,type TEXT,status INTEGER,crontime TEXT)");
		/*
		var stmt = db.prepare("INSERT INTO task VALUES (?)");
		for (var i = 0; i < 10; i++) {
			stmt.run("task " + i);
		}
		stmt.finalize();
		*/
		db.each("SELECT rowid AS id, myid,name,startcmd,stopcmd,desc,type,status FROM task", function(err, row) {
			var job = new Job();
			job.myid = row.myid;
			job.name = row.name;
			job.startcmd = row.startcmd;
			job.stopcmd = row.stopcmd;
			job.desc = row.desc;
			job.type = row.type;
			job.status = row.status;
			job.crontime = row.crontime;
			app.alltask[job.myid] = job;
		});
		startTask(app.alltask);
	});
	
	db.close();
}
var startTask = function(jobs){
	_.each(jobs,function(job,jobid){
		job.run();
	})
}
module.exports = loadtask;