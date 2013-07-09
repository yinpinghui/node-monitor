var router = function(app) {
	return {
		log : function(req, res) {
			res.end();
		},
		index : function(req, res) {
			res.sendfile(app.get("root") + "/public/index.html")
		},
		getJobs : function(req,res){
			res.json(app.alltask);
		},
		
		saveJob : function(req, res) {
			 
		},
		newJob : function(req, res) {
			var job = new Job();
			_.each(["myid","desc","name","crontime","startcmd","stopcmd",],function(key){
				job[key] = res.body[key];
			});
			
		},
		deleteJob : function(req, res) {

		},
		stopJob : function(req, res) {

		},
		restartJob : function(req, res) {

		},
		upload : function(req, res) {

		},
		deploy : function(req, res) {

		},
		runCmd : function(req, res) {

		},
		viewHistory : function(req, res) {

		}
	}
}

module.exports = function(app) {
	var r = router(app)
	app.get("/", r.index);
	app.get("/api/jobs",r.getJobs)
	app.get("/api/log", r.log);
	app.post("/api/job", r.saveJob);
	app.put("/api/job", r.newJob);
	app.delete ("/api/job", r.deleteJob);
	app.post("/api/stop", r.stopJob);
	app.post("/api/restart", r.restartJob);
	app.post("/api/files", r.upload);
	app.post("/api/deploy", r.deploy);
	app.post("/api/runCmd", r.runCmd);
	app.get("/api/viewHistory", r.viewHistory)
	app.get("/*", r.index);
}
