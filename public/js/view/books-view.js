define([ 'underscore', 'resthub', 'collection/books', 'model/book','hbs!template/books', 'view/book-view' ],
function (_, Resthub, Books, Book, booksTemplate, BookView) {
    
    var BooksView = Resthub.View.extend({
        
    	//对应的模板
        template: booksTemplate,
        
        //事件：编辑book和删除book
        events: {
            'click .btn-group .btn-edit' : 			'editBook',
            'click .btn-group .btn-delete' : 		'deleteBook',
            'click .btn-group .btn_add' : 			'addBook',
        },

        //初始化：new View()的时候自动执行，root和collection可以在new View()的时候指定
        initialize:function () {
        	//注意bindAll与bind的区别，推荐前者
        	_.bindAll(this, 'render');
        	
        	this.collection = new Books();
        	
        	//定义事件响应方法：参照collection.reset的说明（当collection元素本身的属性变化，不触发reset）
        	this.collection.on('reset', this.render, this);
        	
        	//根据collection定义的url，从服务器发起Restful的get请求并填充collection，触发reset，因此会导致重新render
            this.collection.fetch({ data: { page: 'no'} });
        	
        },
    
        //render视图：data与hbs模板结合
    	render: function() {
    		var data = {"books": this.collection.toJSON()};
    		this.$el.html(this.template(data));
    		return this;
    	},
    	
    	addBook: function() {
    		var book = new Book();

    		//新建bookView的时候，需要将collection传入
    		var bookView = new BookView({model:book, collection:this.collection});
    		$("#bookDetail").html(bookView.el);
    		$("#bookDetail").modal();
    		
    	},
    	
    	//事件响应函数：编辑book，打开模式对话框，用到bootstrap的Modal
    	editBook: function(e) {
    		//从dom中找到需要编辑的book的id
    		var bookId = $(e.target).parent().attr('data-bookId');
    		
    		//从collection中根据id查到对应的model
    		var book = this.collection.get(bookId);
    		
    		//将model传递给BookView并构造该view作为Modal对话框的内容，可以参照Bootstrap Modal相关说明
    		var bookView = new BookView({model:book});
    		$("#bookDetail").html(bookView.el);
    		$("#bookDetail").modal();
    	},
    	
    	//删除book：目前只是通过model本身的destroy来实现（会发送DELETE请求到后端），并未重新查询数据库，是否合理？
    	deleteBook: function(e) {
    		//同editBook
    		var bookId = $(e.target).parent().attr('data-bookId');
    		var book = this.collection.get(bookId);

    		//调用model的destroy方法，参照book.js定义
    		book.clear();
    		
    		//删除之后，需要重新render book列表画面
    		this.render();
    	}

    });
    return BooksView;
});