/**
 * @Author: Colin Osterhout <ctosterhout>
 * @Date:   2017-08-06T12:01:05-08:00
 * @Email:  ctosterhout@alaska.edu
 * @Project: BERT
 * @Last modified by:   ctosterhout
 * @Last modified time: 2017-08-06T17:04:12-08:00
 * @License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
 */

define([
    'module',
    'jquery',
    'underscore',
    'backbone',
    '/api/js/modules/course.js',

    // Include template for display of decision tree step
    'hbs!/api/js/templates/program'
], function (module, $, _, Backbone, Course, templateProgram) {
    'use strict';

    var View = Backbone.View.extend({
        tagname: 'div',
        initialize: function (options) {
            var that = this;

            // Massage the view options. Placeholder.
            that.viewOptions = _.chain(options)
                .filterArg(['urlProxyCourse'])
                .value();

            that.model = options.model;
            that.el = options.el;
        },
        replaceOnClick: function () {
            var that = this;

            // Replace all onclick handlers which point to showCourse
            $('*[onclick*="showCourse"]', that.el).each(function () {
                // Extract course code information from title
                var code = $(this).attr('title').replace(/\s/g, '%20');
                // Alter href attribute
                $(this).attr('href', 'javascript:;');

                // Remove onclick attribute and assign our own
                $(this).removeAttr('onclick');

                // Assign the popup / tooltip information when clicked
                $(this).on('click', function () {
                    var deferred = $.Deferred();

                    /* jslint ignore:start */
                    new Course({
                        el: this,
                        course: code,
                        urlProxyCourse: that.viewOptions.urlProxyCourse,
                        success: deferred.resolve,
                        fail: deferred.reject
                    });
                    /* jslint ignore:end */

                    setTimeout(function () {
                        deferred.reject('Course module load timeout: ' + code);
                    }, module.config().timeoutModuleLoad);

                    return false;
                });
            });

            // Insert default click handler on the body element to have popups go away on clicking elsewhere
            $('body').one();
        },
        render: function () {
            // Create a new location in an array and populate
            // based on the values in the XML response
            var that = this;

            $(that.el).append(templateProgram(that.model.attributes));
            that.replaceOnClick(that.viewOptions);

            // Tell the world that we're done with setting this up
            that.trigger('render');
        }
    });

    return View;
});
