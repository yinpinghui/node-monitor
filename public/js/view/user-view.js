define(['underscore', 'backbone', 'resthub', 'hbs!template/user'],
function(_, Backbone, Resthub, userTmpl){
  var UserView = Resthub.View.extend({
	//对应的模板
    template: userTmpl,

    //事件
    events: {
    },

    //初始化
    initialize: function(options) {
    	_.bindAll(this, 'render');
    	
    	//model一旦change，需要重新render，在这里貌似没必要
    	this.model.on('change', this.render, this);
      
    	//render
    	this.render();
    }

  });
  return UserView;
});
