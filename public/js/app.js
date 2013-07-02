define(['router/app-router', 'underscore', 'jquery','bootstrap','view/menu-navbar-view','json2','jquery-plugin']
        , function(AppRouter, _, $, _bootstrap, MenuView){
    
    // Send to the server all warn or error logs
    console.level = 'warn';
    
    /**
     *
     * 此处是整个程序入口，需要好好整理这部分的事情 
     * 
     * 1. server端给出静态页面，初始化各种jquery的功能
     * 2. 根据router创建view，这里可能是整体的container view
     * 3. 首页可能是portal页面，因此可能要创建一堆view，当然这些还是根据router定义走。
     * 4. 如果是其他的url，还是按照静态页面->初始化jquery plugin->创建view这个路子走
     * 
     * 可以一次将jquery的plugin全部引入，因为jquery的最终是由一个$统领，所以，争取不需要每次想用的时候单独引入
     * 
     * app 这个文件不做具体工作，而且做引擎工作，以后的其他view，router都是通过引擎调动。
     *  
     */
	window.parseQueryString =function(query){
		var urlParams;
	    var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	
	    urlParams = {};
	    while (match = search.exec(query))
	       urlParams[decode(match[1])] = decode(match[2]);
		
		return urlParams;
	};
	
	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$(document).ready(function() {
      $.ajaxSetup({
          statusCode: {
              901: function() {
              	window.location.reload();
              }
          },
      });

      var ajaxcounter = 0;
      $(document).ajaxSend(function() {
    	  ajaxcounter++;
      }).ajaxComplete(function() {
    	  ajaxcounter--;
	  });

       /**
	   *画左侧菜单栏模板
	   *  **/
	  new MenuView({root: $('#menuContainer')});
	  require([window.jsRoot + 'view/fileupload-view.js'],function(UploadView){
	  	var uploadview = new UploadView();
	  	$('#bodyContainer').append(uploadview.el);
	  });
	  
	  
      /**
       * 全局的错误提示样式函数
       * **/
      window.globalNotify = function(opts){
    	  var icons = {
    			  success: 'picon picon-32 picon-security-high',
    			  fail: 'picon picon-32 picon-security-low',
    			  def: 'picon picon-32 picon-security-medium'
    		};
    	   
    	  var defaultInfo = {
    		        title: "提示",
    		        text: "输入错误。",
    		        addclass: "custom",
    		        icon: icons[opts.type || "def"],
    		        cornerclass: "",
    		        width: "20%"
    		    };
    		   
    	  $.pnotify(_.extend(defaultInfo, opts));
    	  
      };
      $(window).resize( function(){
      	$("a.brand span").text("w:" + $(window).width() + " ; h:" + $(window).height() )
      });
    })

    // window.currentUser = new User();
    // $.when(window.currentUser.fetch()).then(function() {
    	// $("#currentUserLoginInfo").html("欢迎您: " + window.currentUser.get('fullname'));
        // window.approuter=new AppRouter();
        // Backbone.history.start({pushState: true, root:'/inq'});
    // });
    window.approuter=new AppRouter();
    Backbone.history.start({pushState: true, root:'/'});
    
});