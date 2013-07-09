define(['underscore', 'resthub', 'und!template/jobList'], function(_, Resthub, template) {
	var View1 = Resthub.View.extend({
		template : template,
		datas : {},
		events : {
			"button.add" : "addnew",
			"" : ""
		},

		initialize : function() {
			var _self = this;
			$.ajax({
				url : "/api/jobs"
			}).done(function(data){
				_self.datas = data;
				console.log(data)
				_self.render();
			})
		},
	
		render : function() {
			var _self = this;
			_self.$el.html(_self.template());
			
			_.defer(function() {
				var options = {
		            currentPage: 3,
		            totalPages: 10
		        }
		        _self.$el.find('div.pagination').bootstrapPaginator(options);
			})
			return _self;
		},
		addnew : function(){
			
		}
	});
	return View1;
}); 