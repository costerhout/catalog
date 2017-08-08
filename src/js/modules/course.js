/**
 * @Author: Colin Osterhout, modified from sample provided by LeapFrog CourseLeaf
 * @Date:   2017-06-02T14:58:55-08:00
 * @Project: catalog
 * @Last modified by:   ctosterhout
 * @Last modified time: 2017-08-06T17:31:04-08:00
 */

define([
    'models/base',
    '/catalog/js/views/course.js',
    'backbone',
    'lib/debug'
], function (Model, View, Backbone, debug) {
    'use strict';

    // Module configuration for this module is done in the module itself rather than in a configuration file
    var urlProxyCourseDefault = '/catalog/api/getcourse.php',
        templatePath = '/catalog/js/templates/course';

    function Module(options) {
        // Craft the options for the model to pass along to the base model
        var optionsModel = _.chain(options)
                .checkArgMandatory(['course'])
                // Craft the URL for the data backend, either from the module DIV specification or the default
                .defaults({
                    url: (_.isUndefined(options.urlProxyCourse)
                        ? urlProxyCourseDefault
                        : options.urlProxyCourse
                    ) + '?code=' + options.course
                })
                .filterArg(['format', 'url'])
                .value(),
            // Instantiate the model which will go out and get the data
            model = new Model(options.defaults || {}, optionsModel),
            // Craft the data object for the view
            optionsView = _.chain(options)
                .checkArgMandatory(['el'])
                .filterArg(['el', 'templatePath'])
                // Apply sensible view defaults (placeholder)
                .defaults({
                    templatePath: templatePath
                })
                .extend({ model: model })
                .value(),
            // Instantiate the program view object
            view = new View(optionsView);

        // Derive from the event interface
        _.extend(this, Backbone.Events);

        // If the model fails to load or parse properly, then fail
        this.listenToOnce(model, 'error', _.isFunction(options.fail) ? options.fail : _.noop);

        // Listen for the view to be done - when that's finished call the success callback
        this.listenToOnce(view, 'render', _.isFunction(options.success) ? options.success : _.noop);

        // Have the view listen to changes for when the model has finished loading
        view.listenToOnce(model, 'sync', view.render);

        // Fetch the module data
        debug.log('Module instantiated');
        model.fetch();
    }

    return Module;
});
