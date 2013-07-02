define(['underscore', 'resthub', 'hbs!template/users', 'view/teachers-view', 'view/students-view', 'view/user-view', 'model/user'], 
	function(_, Resthub, usersTemplate, TeachersView, StudentsView, UserView, User) {

	var UsersView = Resthub.View.extend({

		//对应的模板
		template : usersTemplate,

		//事件
		events : {
			'click .form-actions .btn-user-save'		: 'saveUser', //保存用户
			'click .form-actions .btn-user-cancel'		: 'backToUsers', //返回列表画面
			'click .users-management .btn-user-add' 	: 'addUser', //添加用户
			'click .users-management .nav-tabs a' 		: 'switchTab' // Tab切换
		},

		//初始化
		initialize : function() {
			_.bindAll(this, 'render');

			this.render();
		},

		//render视图
		render : function() {
			this.$el.html(this.template());
			
			// 默认加载教师一览
			new TeachersView({root: $('#teachers_container')});
			new StudentsView({root: $('#students_container')});
		},

		switchTab : function(e) {
			// var target = e.target.href;
			// console.log(target);
			// if (target.indexOf("student") != -1) {
				// new StudentsView({root: $('#students_container')});
			// }
			$(e.target).tab('show');
			e.preventDefault();

		},
		
		addUser : function() {
			$('#users_container').hide();
			
			var user = new User();
			var userView = new UserView({model:user});
			$('#user_container').html(userView.el);
		},
		
		saveUser : function() {
			console.log('save user..');
			
			this.populateModel();
			
		},
		
		backToUsers : function() {
			$('#user_container').html('');
			
			$('#users_container').show();
		}
	});
	return UsersView;
}); 