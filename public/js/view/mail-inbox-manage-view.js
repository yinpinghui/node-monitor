/**
 * 管理收件箱的view
 * 1. 增删改内部邮箱的标签
 * 2. 增删改外部邮箱的账号
 * 
 * **/
define(['underscore', 'backbone', 'resthub', 'hbs!template/mail-inbox-manage'],
function(_, Backbone, Resthub, composeTmpl){
  var MailSysManageView = Resthub.View.extend({
    template: composeTmpl,
    
    events: {
    	'click .addInboxTag'    : 'addInboxTag',
    	'click .editInboxTag'   : 'editInboxTag',
    	'click .deleteInboxTag' : 'deleteInboxTag',
    	
		'click .addMailbox'        : 'addMailbox',
		'click .btn-saveMailbox'   : 'saveMailbox',
		'click .btn-cancelMailbox' : 'cancelMailbox'
    },
    
    initialize: function(options) {
    	var _self = this;
        _self.render(options);
    },
    
    render : function(options) {
    	var _self = this;
		_self.$el.html(_self.template(options));
		_.defer(function(){
			 _self.$el.find('.inboxTab').tab();
		});
		return _self;
	},
	/**
	 * 新增内部邮箱
	 * **/
	addInboxTag : function(){
		var _self = this;
		var $tbody = _self.$el.find('.cusInboxTag tbody').eq(0);
		var _addNo = $tbody.find('tr').size() + 1;
		
		$tbody.append('<tr id="data2" class="odd gradeX">' +
			'<td>' +  _addNo  + '</td><td>内部邮箱' + _addNo + '</td>' +
			'<td><button type="button" class="btn btn-mini editInboxTag">修改</button> ' + 
			'<button type="button" class="btn btn-mini deleteInboxTag">删除</button></td></tr>');
	},
	/**
	 * 修改内部邮箱的tag
	 * **/
	editInboxTag : function(e){
		var _self = this;
		var $button = $(e.target);
		var $name = $button.parent('td').prev('td');
		
		if($button.hasClass("btn-danger")){
			var _name = $name.find("input").val();
			$name.empty();
			$name.html(_name);
			
			$button.removeClass("btn-danger");
			$button.text("修改");
		}else{
			var _name = $name.html();
			$name.empty();
			
			$button.addClass("btn-danger");
			$button.text("保存");
		
			$name.append('<input value="' + _name + '"/>');
		}
	},
	/**
	 * 删除内部邮箱的tag
	 * **/
	deleteInboxTag : function(e){
		var _self = this;
		var $tr = $(e.target).parents('tr');
		$tr.remove();
	},
	/**
	 * 新增外部邮箱
	 * **/
	addMailbox : function(){
		var _self = this;
		
		_self.$el.find('.externalInboxList').hide();
		_self.$el.find('.addExternalMail').show();
	},
	/**
	 * 保存添加的外部邮箱（或者修改的外部邮箱）
	 * **/
	saveMailbox : function(){
		var _self = this;
		console.log("save...");
		
		_self.$el.find('.addExternalMail').hide();
		_self.$el.find('.externalInboxList').show();
	},
	/**
	 * 取消保存添加的外部邮箱
	 * **/
	cancelMailbox : function(){
		var _self = this;
		console.log("cancel save...");
		
		_self.$el.find('.addExternalMail').hide();
		_self.$el.find('.externalInboxList').show();
	}
	
  });
  return MailSysManageView;
});