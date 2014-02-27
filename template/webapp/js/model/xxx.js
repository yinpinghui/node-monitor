define(['backbone'], function(Backbone) {
    var {{Xxx}} = Backbone.Model.extend({
    	urlRoot: window.contextBase + '/api/{{xxx}}',
    	clear: function() {
            this.destroy();
        }
    });
    return {{Xxx}};
});