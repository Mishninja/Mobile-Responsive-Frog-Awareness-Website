/*
    |--------------------------------------------------------
    | Navigation
    |--------------------------------------------------------
    */
jQuery(function($) {

    var windowWidth = $('body').width();

    /*
    |----------------------------------------------------------------
    | Hide/Show Header
    |----------------------------------------------------------------
    */
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta) {
          return;
        }

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('header-down').addClass('header-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('header-up').addClass('header-down');
            }
        }
        lastScrollTop = st;
    }

    setInterval(function() {
        if(didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    /*
    |--------------------------------------------------------
    | Navigation
    |--------------------------------------------------------
    */
    const targetElement = document.querySelector('.gn');

    $('.gn-trigger').on('click', function(e) {
        e.preventDefault();
        // $(this).toggleClass('is-active');
        if($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $('.gn').slideUp()
            bodyScrollLock.enableBodyScroll(targetElement);
        } else {
            $(this).addClass('is-active');
            $('.gn').slideDown();
            bodyScrollLock.disableBodyScroll(targetElement);
        }
    })

    $(window).resize(function() {
        windowWidth = $('body').width();
        if(windowWidth>767 && $('.gn-trigger').hasClass('is-active')) {
            setTimeout(function() {
                 $('.gn-trigger').removeClass('is-active');
            }, 200);
            $('.gn').slideUp(0)
            bodyScrollLock.enableBodyScroll(targetElement);
        }
    })

    $('.gn a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    bodyScrollLock.enableBodyScroll(targetElement);
    $('.gn-trigger').removeClass('is-active');
    $('.gn').slideUp();
    return false;
});
});

 /*
    |--------------------------------------------------------
    | Masonry/Isotope Initiator
    |--------------------------------------------------------
    */

var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    filter:'*',
    masonry: {
        columnWidth: '.grid-item', 
        gutter: 10
    }
})

//everytime a filter is click, run this function
$('.filters').on('click','li',function() {
    //get attribute assigned to what is click and store as the filterValue
    var filterValue = $(this).attr('data-filter');
    //tell grid to show pictures with this attribute
    $grid.isotope({ filter: filterValue });
});

 /*
    |--------------------------------------------------------
    | Gridder Initiator
    |--------------------------------------------------------
    */
$(function() {

    // Call Gridder
    $('.gridder').gridderExpander({
        scroll: false,
        scrollOffset: 30,
        scrollTo: "panel",                  // panel or listitem
        animationSpeed: 400,
        animationEasing: "easeInOutExpo",
        showNav: true,                      // Show Navigation
        nextText: "Next",                   // Next button text
        prevText: "Previous",               // Previous button text
        closeText: "Close",                 // Close button text
        onStart: function(){
            //Gridder Inititialized
        },
        onContent: function(){
            //Gridder Content Loaded
        },
        onClosed: function(){
            //Gridder Closed
        }
    });

});

 /*
    |--------------------------------------------------------
    | Accordian Initiator
    |--------------------------------------------------------
    */

jQuery(document).ready(function() { 
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
            
          }
        });
      }
})




