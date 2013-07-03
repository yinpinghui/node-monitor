define(['module'], function(module) {

    var masterConfig = (module.config && module.config()) || {};

    var hbs = {
        load: function (name, req, load, config) {
            config = config || {};
            
            var extension = masterConfig.extension;
            if (config.extension) {
                extension = config.extension;
            }
            extension = extension || 'und';
            var textName = 'text!' + name + '.' + extension;
			
            return req(['underscore', textName], function (_, template) {
                if(!config.isBuild) {
                    load(_.template(template));
                }
                else {
                    load(template);
                }
            });
        }
    };

    return hbs;
});
