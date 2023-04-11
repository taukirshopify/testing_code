/*---------------------------------------------
Template name:  tf-quickstart || html template
Version:        1.0
Author:         rajibmehedihasan
Author url:     https://github.com/rajibmehedihasan

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "custom.js" file for writing your custom js.
We may release future updates so it will overwrite this file. it's better and safer to use "custom.js".

[Table of Content]
----------------------------------------------*/

(function ($) {

  var $status = $('.pagingInfo');
  var $slickElement = $('.hero-main-image');
  
  $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    if(!slick.$dots){
      return;
    }
    
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + (slick.$dots[0].children.length));
  });
  $(".hero-main-image").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    lazyLoad: 'ondemand',
    arrows: true,
    infinite: false,
    fade: true,
    
    autoplay: true,
		  autoplaySpeed:5000,
        fade: false,
    asNavFor: ".side-image",
    nextArrow: '<div class="slick-custom-arrow slick-custom-arrow-right"><div class="center-div-slide"><img src="http://www.paulhaynes.com/common_images/arrow_hotspot_right.png" alt=""></div></div>',
    prevArrow: '<div class="slick-custom-arrow slick-custom-arrow-left"> <div class="center-div-slide-right"><img src="http://www.paulhaynes.com/common_images/arrow_hotspot_left.png" alt="arrowleft"></div></div>',
  });
  $(".side-image").slick({
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    Autoplay: true,
    asNavFor: ".hero-main-image",
    focusOnSelect: true,
    variableWidth: true,
  });
  $('.slide-next').click(function(e){
    //e.preventDefault(); 
    $('.hero-main-image').slick('slickNext');
    } );
  $('.slide-prev').click(function(e){ 
    //e.preventDefault(); 

$('.hero-main-image').slick('slickPrev');
} );



$('.pause').click(function() {

  
  // this.removeClass("pause");
  $('.hero-main-image').slick('slickPause');

  
});
$('.play').click(function() {
  $('.hero-main-image').slick('slickPlay');
  $('.hero-main-image').slick('slickNext');
  
});
$('.auto-play-silde').click(function() {
  $('.pause').toggleClass("mainaa");
  $('.play').toggleClass("mainaa");
});



})(jQuery);
