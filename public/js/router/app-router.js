define([ 'backbone','view/jobList-view','backbone-queryparams'], function(
		Backbone,jobListView) {
	var options = {
		routes : {
			'' : 'homePage',
			'users.html' : 'userlist',
			'books.html' : 'booklist',
			'mailBox.html': 'mailbox',
			'notice.html':'notice',
			"jobList.html" : "jobList",
			'#search/:query/p:page':'search',
			"participants":"listParticipants",
			":entity?*args": "query",
      		"*anything": "anything"
      		
		},
		jobList : function(){
			new jobListView({root:"#bodyContainer"});
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