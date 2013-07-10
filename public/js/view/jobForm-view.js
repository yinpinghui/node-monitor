define(['underscore', 'resthub', 'und!template/jobForm', 'model/job'], 
function(_, Resthub, template, Job) {
	var FormView = Resthub.View.extend({
		template : template,

		events : {
			'click button.save' : 'saveItem'
		},

		initialize : function(options) {
			var _self = this;
			
			//id 不存在，add
			if(!options.id){
				_self.type = "add";
				_self.model = new Job();
				_self.render();
			}
			
			//id 存在，type不存在，edit
			if(!!options.id && !options.type){
				_self.type = "edit"; 
				_self.model = new Job({id:options.id});
				_self.model.fetch().done(function(){
					_self.render();
				});
			}
			
			//id 存在，type存在，show
			if(!!options.id && !!options.type){
				_self.type = "show"; 
				_self.model = new Job({id:options.id});
				_self.model.fetch().done(function(){
					_self.render();
				});
			}
			
		},

		render : function() {
			var _self = this;
			
			var options = {
				type: _self.type,
				model: _self.model.toJSON()};
				
			_self.$el.html(_self.template(options));
			
			return _self;
		},
		
		saveItem : function(){
			var _self = this;
			
	    	_self.populateModel();
	    	 
	    	if (_self.model.isValid()) {

		    	_self.model.save(null, {
		            success: function (model, response) {
		                console.log("save ok!");
		            },
		            error: function (model, response) {
		                console.log("save error!");
		            }
		        });
	    	}
		}
		
	});
	return FormView;
}); 