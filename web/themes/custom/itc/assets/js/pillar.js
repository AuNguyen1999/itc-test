/**
 * @file
 * Javascript functionality for itc custom theme.
 */

(function ($, Drupal, once) {
  'use strict';
  Drupal.pillar = Drupal.pillar || {};
  Drupal.behaviors.pillarBehavior = {
    attach: function(context) {
      Drupal.pillar.pillars(context);
    }
  };

  Drupal.pillar.pillars = function (context) {
    const $paragraphItems = $('.paragraph--type-pillars', context);
    if ($paragraphItems.length > 0) {
      $paragraphItems.forEach(function ($paragraphItem) {
        const $paragraphContentWrapper = $($paragraphItem).find('.field--name-field-pillar-items .paragraph-content--wrapper');
        if ($paragraphContentWrapper.length > 0) {
          $paragraphContentWrapper.matchHeight();
        }
        const $pillars = $($paragraphItem).find('.field--name-field-pillar-items > .field__item');
        if ($pillars.length > 0) {
          $pillars.matchHeight();
        }
      })
    }

    const $pillarLogoItems = once('pillarLogoItems', '.pillar__logo', context);
    if ($pillarLogoItems.length > 0) {
      $pillarLogoItems.forEach(function (pillarLogoItem) {
        const $pillarLogoItem = $(pillarLogoItem);
        const animationFile = $pillarLogoItem.data('animation');
        bodymovin.loadAnimation({
          container: $pillarLogoItem[0],
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationFile
        });
      });
    }
  }

})(jQuery, Drupal, once);
