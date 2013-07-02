define(['underscore', 'backbone', 'resthub', 'hbs!template/menu-navbar-style'],
function(_, Backbone, Resthub, menuTmpl){
  var MenuView = Resthub.View.extend({
    template: menuTmpl,
    
    events: {
    	'click .bxnavbar a' 				: 'showSysPage'
    },
    
    initialize: function() {
    	var _self = this;
        _self.render();
    },
    
    render : function() {
    	var _self = this;
		_self.$el.html(_self.template());
		return _self;
	},
	
	showSysPage : function (e){
		var _self = this;
		var $a = $(e.target).closest('a');
		var $breadContainer = $('#menuBreadcrumb');
		
		if(!$a.hasClass('bxnavbar')){
			_self.$el.find('.bxnavbar').removeClass('active');
			$a.closest('.bxnavbar').addClass('active');
			
			if($a.hasClass('dropdown-toggle')){
				$breadContainer.empty();	
			}
			
			if($a.parents('li').hasClass('dropdown-submenu')){
				$breadContainer.append(" <span class='icon-angle-right'></span> ")
				.append($a.parents('li.dropdown-submenu').children('a').text());	
			}
			
			$breadContainer.append(" <span class='icon-angle-right'></span> ")
			.append($a.text());				
		}
		
	}
	
  });
  return MenuView;
});