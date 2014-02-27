define(['underscore', 'resthub', 'und!template/codeGenerator', 'model/code'], 
function(_, Resthub, template) {
	var CodeGenaView = Resthub.View.extend({
		template : template,

		events : {
			'click button.btn-add'    : 'addField',
			'click button.btn-delete' : 'deleteField',
			'click button.generateCode' : 'generateCode',
			'submit form' : 'submitForm'
		},

		initialize : function(options) {
			var _self = this;
			_self.render();
		},

		render : function() {
			var _self = this;
			_self.$el.html(_self.template());
			return _self;
		},
		
		submitForm : function(){
			return false;	
		},
		
		addField : function(e){
			var $tbody = $("tbody.myFields");
			$(e.target).removeClass("btn-add")
						.addClass("btn-delete")
						.html("delete");
			$tbody.append('<tr><td><input type="text" name="fieldName" class="grd-white" value="" placeholder="属性名"/></td>'
					+	'<td><select name="fieldType"><option value="string">String</option><option value="date">Date</option>'
					+   '<option value="number">Number</option></select></td>'
					+	'<td><input type="text" name="fieldZh" class="grd-white" value="" placeholder="属性中文"/></td>'
					+	'<td class="fieldOpt">'
					+	'<button class="btn btn-small btn-add">add</button>'
					+	'</td></tr>');
		},
		
		deleteField : function(e){
			$(e.target).closest("tr").empty();			
		},
		
		generateCode : function(){
			var _data = this.$el.find("form").serializeObject();
			var _mymodel = {};
			_mymodel.className = _data.className;	
			_mymodel.fields = new Array();
			
			if(_.isArray(_data.fieldName)){
				_.each(_data.fieldName, function(data,idx){
				_mymodel.fields.push({
					fieldName:_data.fieldName[idx],
					fieldType:_data.fieldType[idx],
					fieldZh:_data.fieldZh[idx]
					});
				})
			}else{
				_mymodel.fields.push({
					fieldName:_data.fieldName,
					fieldType:_data.fieldType,
					fieldZh:_data.fieldZh
					});				
			}
			
			$("span.myClass").html(JSON.stringify(_mymodel));
			
			$.ajax({
				type:"POST",
				url:"/api/code",
				data:_mymodel
			}).done(function(){
				console.log("back is ok...");
			}).fail(function(){
				console.log("something is wrong at node...");
			});
		}
		
	});
	return CodeGenaView;
}); 