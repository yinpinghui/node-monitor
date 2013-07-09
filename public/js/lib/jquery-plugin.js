define(['jquery',
	window.jsRoot + 'lib/jquery/jquery-ui.min.js',
	window.jsRoot + 'lib/jquery/jquery.ui.touch-punch/jquery.ui.touch-punch.js',
	window.jsRoot + 'lib/jquery/jquery.slimscroll/jquery.slimscroll.min.js',
	window.jsRoot + 'lib/jquery/jquery-ui.min.js',
	window.jsRoot + 'lib/jquery/wysihtml5/wysihtml5-0.3.0.min.js',
	window.jsRoot + 'lib/jquery/bootstrap.wysihtml5/bootstrap-wysihtml5.js',
	window.jsRoot + 'lib/jquery/jquery.chosen/chosen.jquery.min.js',
	window.jsRoot + 'lib/jquery/jquery.maskedinput/jquery.maskedinput.min.js',
	window.jsRoot + 'lib/jquery/bootstrap.datetimepicker/bootstrap-datetimepicker.min.js',
	window.jsRoot + 'lib/jquery/bootstrap.colorpicker/bootstrap-colorpicker.js',
	window.jsRoot + 'lib/jquery/jquery.tagit/jquery.tagsinput.min.js',
	window.jsRoot + 'lib/jquery/bootstrap.switch/bootstrapSwitch.js',
	window.jsRoot + 'lib/jquery/jquery.grab-bag/jquery.autogrow-textarea.js',
	window.jsRoot + 'lib/jquery/bootstrap.fileupload/bootstrap-fileupload.min.js',
	window.jsRoot + 'lib/jquery/jquery.textarea/jquery.textareaCounter.plugin.js',
	window.jsRoot + 'lib/jquery/jquery.uniform/jquery.uniform.min.js',
	//window.jsRoot + 'lib/jquery/select2/select2.js',
	window.jsRoot + 'lib/jquery/jquery.nestable/jquery.nestable.js',
	window.jsRoot + 'lib/jquery/jquery.file-upload/js/jquery.iframe-transport.js',
	window.jsRoot + 'lib/jquery/jquery.file-upload/js/jquery.fileupload.js',
	window.jsRoot + 'lib/jquery/datatables/media/js/jquery.dataTables.min.js',
	
	/*
	window.jsRoot + 'lib/jquery/jquery.upload/jquery.fileupload-process.js',
	window.jsRoot + 'lib/jquery/jquery.upload/jquery.fileupload-image.js',
	window.jsRoot + 'lib/jquery/jquery.upload/jquery.fileupload-audio.js',
	window.jsRoot + 'lib/jquery/jquery.upload/jquery.fileupload-video.js',
	window.jsRoot + 'lib/jquery/jquery.upload/jquery.fileupload-validate.js',
	window.jsRoot + 'lib/jquery/jquery.upload/jquery.fileupload-ui.js'
	*/
		
	// 'js/lib/jquery/twitter-bootstrap/bootstrap-tooltip.js',
	// 'js/lib/jquery/twitter-bootstrap/bootstrap-popover.js'
	
	// 'js/lib/jquery/sidebar.js',
	// 'js/lib/jquery/jquery.ui.touch-punch/jquery.ui.touch-punch.js',
	// 'js/lib/jquery/jquery.slimscroll/jquery.slimscroll.min.js',
	// 'js/lib/jquery/extents.js'
	
	// 'js/lib/jquery/jquery.cookie.js',
	// 'js/lib/jquery/jquery.noty.js',
	// 'js/lib/jquery/datatables/jquery.dataTables.min.js',
	// 'js/lib/jquery/validate/jquery.metadata.js',
	// 'js/lib/jquery/validate/jquery.validate.js',
	// 'js/lib/jquery/datepicker/bootstrap-datepicker.js',
	// 'js/lib/jquery/form/jquery.form.js'

	//'js/lib/jquery/upload/jquery.fileupload.js'
	
	], function ($) {
    //Plugin code goes here.
    require([window.jsRoot + 'lib/jquery/datatables/media/js/DT_bootstrap.js'],function(){
    	return $
    })
});