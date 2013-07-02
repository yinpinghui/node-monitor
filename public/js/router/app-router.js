define([ 'backbone','view/home-view','view/books-view','view/users-view','view/mail-base-view','view/notice-index-view','backbone-queryparams'], function(
		Backbone, HomeView, BooksView, UsersView, MailBaseView,NoticeIndexView) {
	var options = {
		routes : {
			'' : 'homePage',
			'users.html' : 'userlist',
			'books.html' : 'booklist',
			'mailBox.html': 'mailbox',
			'notice.html':'notice',
			'#search/:query/p:page':'search',
			"participants":"listParticipants",
			":entity?*args": "query",
      		"*anything": "anything"
      		
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
		homePage : function(){
			console.log("into home page");
			new HomeView({root: $('#bodyContainer')});
		},
		userlist : function(params) {
			new UsersView({root : $('#bodyContainer')});
		},
		booklist : function(params) {
			new BooksView({root : $('#bodyContainer')});
		},
		
		mailbox: function(){
			new MailBaseView({root : $('#bodyContainer')});
		},
		notice : function() {
				console.log("into notice page");
			new NoticeIndexView({root : $('#bodyContainer')});
		},
	};

	var AppRouter = Backbone.Router.extend(options);
	return AppRouter;
});