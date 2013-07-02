define(['underscore', 'resthub', 'collection/users', 'model/user', 'hbs!template/teachers'], function(_, Resthub, Users, User, teachersTemplate) {

	var TeachersView = Resthub.View.extend({

		//对应的模板
		template : teachersTemplate,

		//事件
		events : {
		},

		//初始化
		initialize : function() {
			_.bindAll(this, 'render');

			this.collection = new Users();

			//定义事件响应方法：参照collection.reset的说明（当collection元素本身的属性变化，不触发reset）
			this.collection.on('reset', this.render, this);

			//根据collection定义的url，从服务器发起Restful的get请求，并填充请求参数，例如category=1
			this.collection.fetch({
				data : {
					category : 'teacher'
				}
			});

		},

		//render视图：data与hbs模板结合
		render : function() {
			var data = {
				"teachers" : this.collection.toJSON()
			};
			this.$el.html(this.template(data));

			setTimeout(this.initPage(), 1);

			return this;
		},

		initPage : function() {
			$(".chzn-select").chosen({
				width : '95%',
				fixed_width : false
			});
			$(".chzn-select-deselect").chosen({
				allow_single_deselect : true,
				fixed_width : false
			});
		}
	});
	return TeachersView;
}); 