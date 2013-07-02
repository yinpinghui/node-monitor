define(['underscore', 'backbone', 'resthub', 'hbs!template/allnotice'],
function(_, Backbone, Resthub, allNoticeTmpl){
  var AllNoticeView = Resthub.View.extend({
    template: allNoticeTmpl,
    
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
    	 setTimeout(function(){
             	$('#noticeBeginTime').datepicker({dateFormat: 'yy-mm-dd'}); 
            	$('#noticeEndTime').datepicker({dateFormat: 'yy-mm-dd'});              		
             },0);
    	
    	var _self = this;
		_self.$el.html(_self.template());
		return _self;
	}
	
  });
  return AllNoticeView;
});