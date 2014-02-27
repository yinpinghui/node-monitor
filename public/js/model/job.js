define(['backbone'], function(Backbone) {
    var Job = Backbone.Model.extend({
    	urlRoot: '/api/job',
    	clear: function() {
            this.destroy();
        }
    });
    return Job;
});