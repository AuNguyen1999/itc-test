/**
 * @file
 * Javascript functionality for itc custom theme.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.carousel = Drupal.carousel || {};
  Drupal.behaviors.carouselBehavior = {
    attach: function(context) {
      Drupal.carousel.carousel(context);
    }
  };

  Drupal.carousel.carousel = function(context) {
    const $paragraphItems = once('paragraphItems', '.paragraph--type--carousel ', context);
    if ($paragraphItems.length > 0) {
      $paragraphItems.forEach(function(paragraphItem) {
        const $this = $(paragraphItem);
        const $carouselItems = $this.find('.field--name-field-carousel-items');
        $carouselItems.slick({
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '.paragraph-carousel-alter-button.slick-prev',
          nextArrow: '.paragraph-carousel-alter-button.slick-next'
        });
      });
    }
  };
})(jQuery, Drupal);
