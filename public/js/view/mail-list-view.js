/**
 * 邮箱列表的view
 * 收件箱、发件箱、草稿箱、垃圾箱都要重用
 * 
 * **/
define(['underscore', 'backbone', 'resthub', 'hbs!template/mail-list', 'jquery-plugin'],
function(_, Backbone, Resthub, listMailTmpl){
  var MailListView = Resthub.View.extend({
    template: listMailTmpl,
   
    events: {
    	'click .mailFilter a' : 'getMailFilter',
    	'click .mailPageFilter a' : 'getMailPageFilter'
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
	
	getMailFilter : function(e){
		var _self = this;
		var $a = $(e.target).closest('a');
		var $span = _self.$el.find('.mailStatus');
		$span.html($a.text());
	},
	
	getMailPageFilter : function(e){
		var _self = this;
		var $a = $(e.target).closest('a');
		var $span = _self.$el.find('.pageStatus');
		$span.html($a.text());
	}
	
	
  });
  return MailListView;
});