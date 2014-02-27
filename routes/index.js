var router = function(app) {
	return {
		log : function(req, res) {
			res.end();
		},
		index : function(req, res) {
			res.sendfile(app.get("root") + "/public/index.html")
		},
		getJobs : function(req,res){

			if(req.query.page == "no"){

				res.json(
					[{id:"1",name:"name1",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""},
						{id:"2",name:"name2",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""},
						{id:"3",name:"name3",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""},
						{id:"4",name:"name4",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""}]);				
			}else{

				res.json({
					content: [
						{id:"1",name:"name1",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""},
						{id:"2",name:"name2",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""},
						{id:"3",name:"name3",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""},
						{id:"4",name:"name4",startcmd:"",stopcmd:"",desc:"",type:"type",status:"",crontime:""}
					],
				    size : 10,
					number : 0,
					sort : [ {
						direction : "ASC",
						property : "name",
						ascending : true
						  } ],
					firstPage : true,
					totalPages : 5,
					numberOfElements : 4,
					totalElements : 44,
					lastPage : true
				});
			}
			// res.json(app.alltask);
		},
		
		saveJob : function(req, res) {
			 console.log(req.body);
			 res.json();
		},
		newJob : function(req, res) {
			var job = new Job();
			_.each(["myid","desc","name","crontime","startcmd","stopcmd",],function(key){
				job[key] = res.body[key];
			});
			
		},
		deleteJob : function(req, res) {
			console.log(req.param);
			res.json();
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
		sendCodeFile : function(req, res){
			var codeHandler = require("../service/generateCode").generating;
			codeHandler(req.body, function(){
				res.send("OK");
			});			
		},
		viewHistory : function(req, res) {

		}
	}
}

module.exports = function(app) {
	var r = router(app)
	app.get("/", r.index);
	app.get("/api/jobs",r.getJobs);
	app.get("/api/jobs/:page",r.getJobs);
	app.get("/api/log", r.log);
	app.post("/api/job", r.saveJob);
	app.put("/api/job", r.newJob);
	app.delete ("/api/job", r.deleteJob);
	app.post("/api/stop", r.stopJob);
	app.post("/api/restart", r.restartJob);
	app.post("/api/files", r.upload);
	app.post("/api/deploy", r.deploy);
	app.post("/api/runCmd", r.runCmd);
	app.post("/api/code", r.sendCodeFile);
	app.get("/api/viewHistory", r.viewHistory)
	app.get("/*", r.index);
}
