define(['underscore', 'backbone', 'resthub', 'hbs!template/noticeissuebyme'],
function(_, Backbone, Resthub, issueByMeNoticeTmpl){
  var NoticeIssueByMeView = Resthub.View.extend({
    template: issueByMeNoticeTmpl,
    
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
		return _self;
	}
	
  });
  return NoticeIssueByMeView;
});