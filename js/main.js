$(document).ready(function () {
    let resizeId; // for resize timer

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    /* Init object fit polyfill */
    /* To make it work, add 'font-family: 'object-fit: cover;';' to image */
    if (window.objectFitImages) {
        window.objectFitImages();
    }

    //reseting header
    function headerReset() {
        // $('.hamburger').removeClass('is-active');
        $('.page-menu').removeClass('is-open');
        $('body, html').removeClass('no-scroll-initial');
    }

    $('.scroll-link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        $('html,body').animate({
                scrollTop: $($this.attr('href')).offset().top
            },
            1000
        );
    });

    $('.hamburger').on('click', function (e) {
        e.stopPropagation();
        // $(this).toggleClass('is-active');
        $('.page-menu').toggleClass('is-open');
        $('body, html').toggleClass('no-scroll-initial');
    });

    $(document).on('click', function (e) {
        if (!e) e = window.event;  //for mozilla
        if ($('.page-menu').hasClass('is-open')) {
            if (!$(e.target).closest('.page-menu.is-open').length) {
                headerReset();
            }
        }
    });

    //Carousels
    function homeSliderInit() {
        let slider = $('.homepage-slider');

        slider.each(function (i, el) {
            let $this = $(el),
                timer = $this.attr('data-timer');
            $this.slick({
                dots: false,
                arrows: false,
                autoplay: true,
                autoplaySpeed: timer,
                fade: true,
                pauseOnFocus: false,
                pauseOnHover: false
            });
        })
    }

    $('.page-section__slider').slick({
        dots: true,
        arrows: false
    });
    //End Carousels

    //Homepage header mob
    function homeHeaderTransition() {
        const header = $('.header');
        let scrollTop = $(window).scrollTop();
        let bottom = $('.homepage-top__card--left').height();
        if (isMobile()) {
            if (scrollTop >= bottom / 2) {
                header.addClass('homepage-header--fixed');
            } else {
                header.removeClass('homepage-header--fixed');
            }
        }
    }

    //Location page
    $('.amenities-list__link').on('click', function (e) {
        e.preventDefault();
        let $this = $(this);
        let parent = $this.parent();
        let listItem = $('.amenities-list__item');
        let sublist = $('.amenities-sublist');

        if (isMobile()) {
            sublist.show();
        } else {
            if (parent.hasClass('is-active')) {
                parent.toggleClass('is-active');
                parent.find('.amenities-sublist').slideToggle();
            }
            else {
                listItem.removeClass('is-active');
                sublist.slideUp();
                parent.addClass('is-active');
                parent.find('.amenities-sublist').slideDown();
            }
        }
    });

    function resetLocationList(){
        if(isMobile()){
            $('.amenities-sublist').show();
        }
    }


    //function calls
    homeSliderInit();

    $(window).on('scroll', function () {
        if ($('body').hasClass('homepage')) {
            homeHeaderTransition();
        }
    });

    $(window).resize(function () {
        /* Trigger resize once */
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);

        resetLocationList();
    });

    function doneResizing() {}

    $(window).on('orientationchange', function () {
        // headerReset();
    });

})
;

$(window).on('load', function () {

});
