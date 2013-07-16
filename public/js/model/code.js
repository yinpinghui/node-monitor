define(['backbone'], function(Backbone) {
    var Code = Backbone.Model.extend({
    	urlRoot: '/api/code',
    	clear: function() {
            this.destroy();
        }
    });
    return Code;
});