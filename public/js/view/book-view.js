define(['underscore', 'backbone', 'resthub', 'hbs!template/book', 'view/books-view'],
function(_, Backbone, Resthub, bookTmpl, BooksView){
  var BookView = Resthub.View.extend({
	//对应的模板
    template: bookTmpl,

    //事件：点击保存按钮时，调用saveBook方法
    events: {
    	'click .modal-footer .btn-save' : 'saveBook',
    },

    //初始化：model通过构造函数传递过来，参见books-view.js的editBook方法
    initialize: function(options) {
    	//bindAll
    	_.bindAll(this, 'render');
    	
    	//model一旦change，需要重新render，在这里貌似没必要
    	this.model.on('change', this.render, this);

    	//新建book view的时候，model.collection为undefined，需要外部传入
    	//参考books-view.js中的addBook方法
   		this.model.collection = this.model.collection || this.collection ;
      
    	//render
    	this.render();
    },
    
    //事件响应函数：从页面自动获取变量（需要控件名称与model名称一致），并保存到数据库
    //当保存成功后，重新fetch整个collection
    saveBook: function() {
    	//因为存在回调，如果直接用this，会导致作用域不一致，因此显式定义一个_self变量表示当前的BookView
    	var _self = this;
    	
    	//从页面自动填充model
    	_self.populateModel();
    	
    	//验证无误之后，调用保存
    	if (_self.model.isValid()) {
    		//由于之前已经调用populateModel()，这里save第一个参数不再需要指定保存的attributes了
	    	_self.model.save(null, {
	            success: function (model, response) {
	                // 重新查询数据库获得最新列表
	                _self.model.collection.fetch({ data: { page: 'no'} });
	            },
	            error: function (model, response) {
	                console.log("error");
	            }
	        });
    	}

    	//成功保存之后，需要隐藏当前的modal对话框
    	$("#bookDetail").modal('hide');
    }

  });
  return BookView;
});
