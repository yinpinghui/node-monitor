define(['underscore', 'backbone', 'resthub', 'hbs!template/menu-accordion-style'],
function(_, Backbone, Resthub, menuTmpl){
  var MenuView = Resthub.View.extend({
    template: menuTmpl,
    
    events: {
    	'click #accordion2-menu a' 				: 'showSysPage'
    },
    
    initialize: function() {
    	var _self = this;
        _self.render();
    },
    
    render : function() {
    	var _self = this;
		_self.$el.html(_self.template({imgRoot:window.imgRoot}));
		return _self;
	},
	
	showSysPage : function (e){
		var _self = this;
		var $a = $(e.target).closest('a');
		var $breadContainer = $('#menuBreadcrumb');
		
		if(!$a.hasClass('accordion-toggle')){
			_self.$el.find('.accordion-group').removeClass('active');
			$a.closest('.accordion-group').addClass('active');
			
			_self.$el.find('li').removeClass('active');
			$a.parents('li').addClass('active');	

			$breadContainer.empty();
			$breadContainer.append(" <span class='icon-angle-right'></span> ")
			.append($a.clone());				
		}
		
	}
	
  });
  return MenuView;
});