/**
 * @Author: Colin Osterhout <ctosterhout>
 * @Date:   2017-08-06T12:01:05-08:00
 * @Email:  ctosterhout@alaska.edu
 * @Project: BERT
 * @Last modified by:   ctosterhout
 * @Last modified time: 2017-08-06T16:47:57-08:00
 * @License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var optionsPopoverDefault = {
            animation: true,
            placement: 'right',
            selector: false,
            trigger: 'manual'
        },
        View = Backbone.View.extend({
            tagname: 'div',
            initialize: function (options) {
                var that = this;

                // Massage the view options. Placeholder.
                that.viewOptions = _.chain(options)
                    .filterArg([])
                    .value();

                that.model = options.model;
                that.el = options.el;
            },
            render: function () {
                // Create a new location in an array and populate
                // based on the values in the XML response
                var that = this,
                    squashPopup = function () {
                        $(that.el).popover('hide');
                    },
                    nodeContent = $.parseHTML(that.model.attributes.course.valueOf());

                // If the element we're operating on is an A element then start popup
                if ($(that.el).is('a')) {
                    // Strip all course bubble links
                    $('a.bubblelink', nodeContent).contents().unwrap();
                    $(that.el).popover(_.defaults({
                        title: that.model.attributes.course.code,
                        html: true,
                        content: nodeContent
                    }, optionsPopoverDefault));

                    $(that.el).popover('show');
                    $('body').click(squashPopup);
                }

                // Tell the world that we're done with setting this up
                that.trigger('render');
            }
        });

    return View;
});
