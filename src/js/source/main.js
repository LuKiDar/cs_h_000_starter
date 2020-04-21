
(function ($) {
    "use strict";

/*
 * Body fix
 */
    /*** Fix for content width when menu is opened ***/
    var scrollbarWidth = 0;
    $(window).on('load resize', function () {
        /* Create the measurement node */
        let scrollDiv = document.createElement("div");
        scrollDiv.className = "scrollbar-measure";
        document.body.appendChild(scrollDiv);
        /* Get the scrollbar width */
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        /* Delete the DIV */
        document.body.removeChild(scrollDiv);
    });
    $(document).ready(function () {
        if (navigator.platform.match('Mac') !== null) {
            $('body').addClass('macos');
        }
        if (navigator.platform.match('iPhone') !== null) {
            $('body').addClass('iphone');
        }
    });


/*
 * Srcset for blocks with background
 */
    /*$(document).ready(function() {
        if ( $('.cs__bgsrcset').length>0 ){
            var bgss = new bgsrcset();
            bgss.callonce = false;
            bgss.init('.cs__bgsrcset');
        }
    });*/


/*
 * Header. Navbar
 */
    $(document).ready(function () {
        $('.cs__header__navbar-toggle').click(function (){
            if ($('body').hasClass('menu-active')) {
                $('body').removeClass('menu-active').css('padding-right', '');
                $('.cs__header').css('right', '');
                $('.cs__header__navbar-wrapper .main-menu').css('padding-right', '');
            } else {
                $('body').addClass('menu-active').css('padding-right', scrollbarWidth);
                $('.cs__header').css('right', scrollbarWidth);
                $('.cs__header__navbar-wrapper .main-menu').css('padding-right', scrollbarWidth);
            }
        });
        $('.cs__header__overlay-bg').click(function (){
            if ($('body').hasClass('menu-active')) {
                $('body').removeClass('menu-active').css('padding-right', '');
                $('.cs__header').css('right', '');
                $('.cs__header__navbar-wrapper .main-menu').css('padding-right', '');
            }
        });
    });


/**
 * Background lazyloads
 */
    /*** Checks if image is loaded and then adds class 'image-loaded' to show content ***/
    /*function lazyLoadImages( mainBlock, imgBlock, backgroundParam ){
        $(document).ready(function() {
            if ( mainBlock.length > 0 ) {
                let params = {};
                if ( backgroundParam===true ){ params = {background: true}; }
                imgBlock.imagesLoaded(params).done(function(){
                    mainBlock.addClass('image-loaded');
                }); 
            }
        });
    }

    $(document).on('ready', function () {
        lazyLoadImages($('.cs__section'), $('.cs__section__bg'), true);
    })*/


/*
 * Animattion for blocks
 */
    /*** If there any block on the page with class 'animated-block' this code adds class 'ab-visible' when user scrolls to it ***/
    let blocks_to_show = [];

    var setBlocksOffsets = function() {
        let page_blocks = $('.animated-block');
        let i = 1;
        
        page_blocks.each(function() {
            if (!$(this).hasClass('ab-visible')) {
                blocks_to_show.push({ element : $(this), scroll_offset: -150 });
            } i++;
        });
    };

    var checkBlocksPosition = function() {
        if (blocks_to_show.length) {
            let currentScrollPosition = $(window).scrollTop() + $(window).height();
            for (let i=0; i<blocks_to_show.length; i++) {
                if (currentScrollPosition + blocks_to_show[i].scroll_offset > blocks_to_show[i].element.offset().top) {
                    blocks_to_show[i].element.addClass('ab-visible').trigger('classChanged');
                } /*else if (currentScrollPosition + blocks_to_show[i].scroll_offset < blocks_to_show[i].element.offset().top && blocks_to_show[i].element.hasClass('ab-visible')) {
                    blocks_to_show[i].element.removeClass('ab-visible').trigger('classChanged');
                }*/
            }      
        }
    };

    var handleBlocksPosition = function() {
        setBlocksOffsets();
        checkBlocksPosition();
    };

    $(window).on('load', handleBlocksPosition());
    $(window).on('scroll', checkBlocksPosition);

})(jQuery);