define(['underscore', 'backbone', 'resthub', 'hbs!template/mynotice'],
function(_, Backbone, Resthub, myNoticeTmpl){
  var MyNoticeView = Resthub.View.extend({
    template: myNoticeTmpl,
    
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
  return MyNoticeView;
});