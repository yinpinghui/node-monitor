define(['underscore', 'backbone', 'resthub', 'hbs!template/homePage'],
function(_, Backbone, Resthub, homePageTmpl){
  var HomePageView = Resthub.View.extend({
    template: homePageTmpl,
    
    events: {
    	// 'click .sys-func-page' 				: 'showSysPage'
    },
    
    initialize: function() {
    	var _self = this;
        _self.render();
    },
    
    render : function() {
    	var _self = this;
		_self.$el.html(_self.template());
		return _self;
	}
	
  });
  return HomePageView;
});