define(['underscore', 'backbone', 'resthub', 'hbs!template/notice-index','view/mynotice-view','view/allnotice-view','view/noticeissuebyme-view','view/managenotice-view','view/maintainitem-view','view/issuenotice-view'],
function(_, Backbone, Resthub, noticeIndexTmpl,MyNoticeView,AllNoticeView,NoticeIssueByMeView,ManageNoticeView,MaintainItemView,IssueNoticeView){
  var NoticeIndexView = Resthub.View.extend({
    template: noticeIndexTmpl,
    
    events: {
    	// 'click .sys-func-page' 				: 'showSysPage'
    },
    
    initialize: function() {
    	//console.log('a');
    	_.bindAll(this, 'render');
    	var _self = this;
        _self.render();
    },
    
    render : function() {
    	var _self = this;
    	console.log(this); 	  	
		_self.$el.html(_self.template());
		new MyNoticeView({root: $('#mynotice')});
		new AllNoticeView({root: $('#allnotice')});
		new NoticeIssueByMeView({root: $('#issuebyme')});
		new ManageNoticeView({root: $('#managenotice')});
		new MaintainItemView({root: $('#maintainitem')});
		new IssueNoticeView({root: $('#issuenotice')});
		return _self;
	}
	
  });
  return NoticeIndexView;
});