/**
 * 邮件模块的基础view
 * 邮件所有功能的入口
 * 1. 查看邮件
 * 2. 编辑个人通讯录
 * 3. 管理收件箱
 * 
 * TODO: 添加个人通讯录的view
 * **/
define(['underscore', 'backbone', 'resthub', 'hbs!template/mail-base', 'view/mail-sys-view','view/mail-inbox-manage-view'],
function(_, Backbone, Resthub, baseTmpl, MailSysView, MailInboxManageView){
  var MailBaseView = Resthub.View.extend({
    template: baseTmpl,
    
    events: {
    	'click .returnToInbox' : "toInbox",
    	'click .mailContact'   : 'toMailContact',
    	'click .inboxManage'   : 'toInboxManage'
    },
    
    initialize: function(options) {
    	var _self = this;
		
		//TODO: 默认获取内部邮箱的数据，并展示
        _self.render(options);
    },
    
    render : function(options) {
    	var _self = this;
		_self.$el.html(_self.template());
		
		new MailSysView({
			root : _self.$el.find('#mailSysContainer')
		});
		
		return _self;
	},
	/**
	 * 返回内部邮件的收件箱
	 * **/
	toInbox : function(e){
		var _self = this;
		
		//TODO: 返回之前，提示用户是否要保存正在编辑的信息
		
		$(e.target).hide();
		
		_self.$el.find("#mailContactContainer").hide();
		_self.$el.find("#inboxManageContainer").hide();
		_self.$el.find("#mailSysContainer").show();
	},
	/**
	 * 进入个人通讯录，隐藏其他2个div
	 * **/
	toMailContact : function(e){
		var _self = this;
		console.log("go to manage contact...");

		_self.$el.find('.returnToInbox,').show();
		
		_self.$el.find("#mailSysContainer").hide();
		_self.$el.find("#inboxManageContainer").hide();
		_self.$el.find("#mailContactContainer").show();
		
		//TODO: 参考用户管理系统，完成
	},
	/**
	 * 画管理收件箱的view，隐藏其他2个div
	 * **/
	toInboxManage : function(){
		var _self = this;
		console.log("go to manage inbox...");
		
		new MailInboxManageView({
			root : _self.$el.find('#inboxManageContainer')
		});
		
		_self.$el.find('.returnToInbox').show();
		
		_self.$el.find("#mailSysContainer").hide();
		_self.$el.find("#mailContactContainer").hide();
		_self.$el.find("#inboxManageContainer").show();
	}
	
  });
  return MailBaseView;
});