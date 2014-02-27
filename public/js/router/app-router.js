define([ 'backbone', 'view/jobList-view', 'view/jobForm-view', 'view/codeGenerator-View', 'backbone-queryparams'], function(
		Backbone, jobListView, jobFormView, codeGeneratorView) {
	var options = {
		routes : {
			'' : 'homePage',
			'users.html' : 'userlist',
			'books.html' : 'booklist',
			'mailBox.html': 'mailbox',
			'notice.html':'notice',
			"jobs" : "jobList",
			"jobs/page:page" : "jobList",
			"job/new" : "jobForm",
			"job/:id" : "jobShow",
			"job/:id/edit" : "jobForm",
			"generateCode.html" : "generateCode",
			'#search/:query/p:page':'search',
			"participants":"listParticipants",
			":entity?*args": "query",
      		"*anything": "anything"
      		
		},
		jobList : function(page){
			new jobListView({root:"#bodyContainer", page:page});
		},
		jobShow : function(id){
			new jobFormView({root:"#bodyContainer", id:id, type:"show"});
		},
		jobForm : function(id){
			new jobFormView({root:"#bodyContainer", id:id});
		},
		generateCode : function(){
			new codeGeneratorView({root:"#bodyContainer"});
		},
		query: function(entity, args) {
	      this.entity = entity;
	      this.queryArgs = args;
	      console.info("entity is " + entity +"; queryArgs is " + queryArgs);
	    },
	
	    anything: function(whatever) {
	      this.anything = whatever;
	      console.info("anything is " + whatever);
	    },
		listParticipants:function (params) {
            // params contains the list of all query params of is empty if no param
			console.info("params is " + params);
        },
		search:function(query,page){
			
		},

		
	};

	var AppRouter = Backbone.Router.extend(options);
	return AppRouter;
});