// Set the require.js configuration for your application.
require.config({
	config : {
		text: {
	      useXhr: function (url, protocol, hostname, port) {
	        // allow cross-domain requests
	        // remote server allows CORS
	        return true;
	      }
	    }
	},
	urlArgs: "bust="+ (new Date()).getTime(),
    shim: {
        'underscore': {
            exports: '_'
        },
        'underscore-string': {
            deps: [
                'underscore'
            ]
        },
        'handlebars-orig': {
            exports: 'Handlebars'
        },
        'backbone': {
            deps: [
                'underscore',
                'underscore-string',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'backbone-queryparams': {
            deps: [
                'backbone'
            ]
        },
        'backbone-datagrid': {
            deps: [
                'backbone'
            ],
            exports: 'Backbone.Datagrid'
        },
        'backbone-paginator': {
            deps: [
                'backbone'
            ],
            exports: 'Backbone.Paginator'
        },
        'bootstrap': {
            deps: [
                'jquery'
            ]
        },
        'backbone-relational': {
            deps: [
                'backbone'
            ]
        },
        'keymaster': {
            exports: 'key'
        },
        'async': {
            exports: 'async'
        },
        "jquery-plugin": {
            exports: "$",
            deps: ['jquery']
        }
    },

    // Libraries
    paths: {
        'jquery': window.jsRoot + 'lib/jquery/jquery-1.9.1.min',
        'jquery.ui.widget' : window.jsRoot + 'lib/jquery/jquery.file-upload/js/vendor/jquery.ui.widget',
        'jquery-plugin': 'lib/jquery-plugin',
        'underscore': window.jsRoot + 'lib/underscore',
        'underscore-string': window.jsRoot + 'lib/underscore-string',
        'backbone': window.jsRoot + 'lib/backbone',
        'resthub': window.jsRoot + 'lib/resthub/resthub',
        'localstorage': window.jsRoot + 'lib/localstorage',
        'text': window.jsRoot + 'lib/text',
        'i18n': window.jsRoot + 'lib/i18n',
        'pubsub': window.jsRoot + 'lib/resthub/pubsub',
        'bootstrap': window.jsRoot + 'lib/bootstrap',
        'backbone-validation-orig': window.jsRoot + 'lib/backbone-validation',
        'backbone-validation': window.jsRoot + 'lib/resthub/backbone-validation-ext',
        'handlebars-orig': window.jsRoot + 'lib/handlebars',
        'handlebars': window.jsRoot + 'lib/resthub/handlebars-helpers',
        'backbone-queryparams': window.jsRoot + 'lib/backbone-queryparams',
        'backbone-datagrid': window.jsRoot + 'lib/backbone-datagrid',
        'backbone-paginator': window.jsRoot + 'lib/backbone-paginator',
        'backbone-relational': window.jsRoot + 'lib/backbone-relational',
        'async': window.jsRoot + 'lib/async',
        'keymaster': window.jsRoot + 'lib/keymaster',
        'hbs': window.jsRoot + 'lib/resthub/require-handlebars',
        'und': window.jsRoot + 'lib/resthub/require-underscoreTemplate',
        'moment': window.jsRoot + 'lib/moment',
		'json2': window.jsRoot + 'lib/json2',
        'console': window.jsRoot + 'lib/resthub/console',
        'template': '../template'
    },

    locale: localStorage.getItem('locale') || 'zh-cn'
});

// Load our app module and pass it to our definition function
require(['console','jquery-plugin'],function(){
	if (/^()\/login.*/.test(location.pathname)){
		require(['login']);	
	}else{
		require(['app']);
	}
	
});
