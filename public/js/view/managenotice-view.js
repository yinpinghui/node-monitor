define(['underscore', 'backbone', 'resthub', 'hbs!template/managenotice'],
function(_, Backbone, Resthub, manageNoticeTmpl){
  var ManageNoticeView = Resthub.View.extend({
    template: manageNoticeTmpl,
    
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
  return ManageNoticeView;
});