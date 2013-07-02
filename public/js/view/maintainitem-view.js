define(['underscore', 'backbone', 'resthub', 'hbs!template/maintainitem'],
function(_, Backbone, Resthub, maintainItemTmpl){
  var MaintainItemView = Resthub.View.extend({
    template: maintainItemTmpl,
    
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
  return MaintainItemView;
});