define(['underscore', 'resthub', 'und!template/jobList'], 
function(_, Resthub, template) {
	var ListView = Resthub.View.extend({
		
		template : template,
		
		page : null,
		
		events : {
			"click button.btn-delete" : "deleteItem"
		},

		initialize : function(options) {
			var _self = this;
			var _url = (!!options.page)? "/api/jobs?page=" + options.page : "/api/jobs";
			
			_self.page = (!!options.page)? options.page : 1;

			$.ajax({
				url : _url
			}).done(function(data){
				_self.render(data);
			})
		},

		render : function(data) {
			var _self = this;
			console.log(data);
			if(!!data.totalPages && data.totalPages !== 0){
				
				//totalPages存在，有分页
				_self.$el.html(_self.template({jobs:data.content}));
			
				_.defer(function() {
					var options = {
			            currentPage: _self.page,
			            totalPages: data.totalPages,
			            size: "small",
			            alignment: "right",
			            onPageClicked: function(e,originalEvent,type,page){
			            	var _url = "jobs/page" + page;
			            	window.approuter.navigate(_url,{trigger:"true"});
			            }
			        }
			        _self.$el.find('.pagination').bootstrapPaginator(options);
			     });
			}else{
				console.log(data);
				//totalPages不存在，没有分页
				_self.$el.html(_self.template({jobs:data.content}));
			}
			
			return _self;
		},
		
		deleteItem : function(e){
			var jobId = $(e.target).closest('td').attr('data-jobId');
			$.ajax({
				type:"DELETE",
				url:"/api/job/"+ jobId
			}).done(function(){
				window.approuter.navigate("jobs", {trigger: true});
			});
		}
		
	});
	return ListView;
}); 