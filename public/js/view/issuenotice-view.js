define(['underscore', 'backbone', 'resthub', 'hbs!template/issuenotice'],
function(_, Backbone, Resthub, issueNoticeTmpl){
  var IssueNoticeView = Resthub.View.extend({
    template: issueNoticeTmpl,
    
    events: {
    	// 'click .sys-func-page' 				: 'showSysPage'
    },
    
    initialize: function() {
    	//console.log('a');
    	//_.bindAll(this, 'render');
    	var _self = this;
        _self.render();
    },
    
    render : function() {
    	
    	var _self = this;
		_self.$el.html(_self.template());
		 setTimeout(function(){
		 	var today=new Date();
		 	var y=today.getFullYear();
		 	var m=today.getMonth()+1;
		 	var d=today.getDate();
		 	var nowdate=y+'-'+m+'-'+d
            	$('#noticeIssueTime').val(nowdate);      	
             },0);
	
		return _self;
	}
	
  });
  return IssueNoticeView;
});