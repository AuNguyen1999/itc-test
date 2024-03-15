/**
 * @file
 * Javascript functionality for itc custom theme.
 */

(function ($, Drupal, drupalSettings) {
  'use strict'
  Drupal.scroll = Drupal.scroll || {}
  Drupal.behaviors.scrollBehavior = {
    attach: function (context) {
      Drupal.scroll.scrollBody(context)
    },
  }

  Drupal.scroll.scrollBody = function (context) {
    $(window).on('scroll', Drupal.scroll.handleScroll)
    $(window).on('beforeunload', function () {
      $(window).off('scroll', Drupal.scroll.handleScroll())
    })
  }

  Drupal.scroll.handleScroll = function (context) {
    const $html = $('html');
    const toolBarHeight = parseFloat($html[0].style.getPropertyValue('--drupal-displace-offset-top')) || 0;
    const $regionHeader = $('.region-header');
    if ($(window).scrollTop() >= 40 + toolBarHeight) {
      $regionHeader.addClass('scrolled')
    } else {
      $regionHeader.removeClass('scrolled')
    }
  }


})(jQuery, Drupal, drupalSettings)
