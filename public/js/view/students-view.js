define([ 'underscore', 'resthub', 'collection/users', 'model/user','hbs!template/students' ],
function (_, Resthub, Users, User, studentsTemplate) {
    
    var StudentsView = Resthub.View.extend({
        
    	//对应的模板
        template: studentsTemplate,
        
        //事件
        events: {
        },

        //初始化
        initialize:function () {
        	_.bindAll(this, 'render');
        	
        	this.collection = new Users();
        	
        	//定义事件响应方法：参照collection.reset的说明（当collection元素本身的属性变化，不触发reset）
        	this.collection.on('reset', this.render, this);
        	
        	//根据collection定义的url，从服务器发起Restful的get请求，并填充请求参数，例如category=1
            this.collection.fetch({ data: { category: 'student' } });
        	
        },
    
        //render视图：data与hbs模板结合
    	render: function() {
    		var data = {"users": this.collection.toJSON()};
    		this.$el.html(this.template(data));
    		return this;
    	}
    });
    return StudentsView;
});