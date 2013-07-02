/**
 * 查看邮件列表的主view
 * 1. 查看左侧邮箱对应的邮件
 * 2. 写信
 * 3. 看信，转发邮件时，切换到写信
 * 
 * **/
define(['underscore', 'backbone', 'resthub', 'hbs!template/mail-sys', 'view/mail-list-view','view/mail-compose-view'],
function(_, Backbone, Resthub, baseTmpl, MailListView, ComposeMailView){
  var MailSysView = Resthub.View.extend({
    template: baseTmpl,
    
    events: {
    	'click .compose-button' : 'composeLetter',
    	'click .receiveMail-button' : 'receiveLetter',
    	'click .social-nav-list a' : 'changeMailContainer'
    },
    
    initialize: function() {
    	var _self = this;

        _self.render();
    },
    
    render : function() {
    	var _self = this;
		_self.$el.html(_self.template());
		new MailListView({root : _self.$el.find('#mailContainer')});
		
		return _self;
	},
	/**
	 * 写信
	 * **/
	composeLetter : function() {
		var _self = this;
		_self.$el.find('.social-nav-list li').removeClass('active');
		
		new ComposeMailView({
			root : _self.$el.find('#mailContainer'),
			mailFromStatus : "hidden" //发送内部邮件，不显示发件人，显示用：show
		});
	},
	/**
	 * 收信，默认选中内部收件箱
	 * **/	
	receiveLetter : function(){
		var _self = this;
		_self.$el.find('.social-nav-list li').removeClass('active');
		_self.$el.find('.social-nav-list li').eq(0).children('a').trigger('click');
	},
	/**
	 * 打开选中的邮箱
	 * **/
	changeMailContainer : function(e){
		var _self = this;
		var $a = $(e.target).closest('a');
		_self.$el.find('.social-nav-list li').removeClass('active');
		$a.parents('li').addClass('active');
		
		new MailListView({root : _self.$el.find('#mailContainer')});
		
		//TODO: 删除测试用的显示当前邮箱的文字： myTestMailBox
		_self.$el.find(".myTestMailBox").html($a.text());
	}
  });
  return MailSysView;
});