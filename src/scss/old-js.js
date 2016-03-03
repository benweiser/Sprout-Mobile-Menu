   //************************************
    // 
    // Mobile Menu
    // 
    //************************************
    
    var HTML = '<div class="fade-screen"></div><div class="hamburger-holder">';
    HTML+= '<div class="menu-text">Menu</div>';
    HTML+= '<div class="menu-toggle hamburger"><span></span><span></span><span></span></div></div>';

    $('.nav-primary').clone().insertBefore('.nav-primary').attr("class", "sliding-panel-content");
    $('.sliding-panel-content').before(HTML);
    $('.hamburger-holder, .fade-screen').on('click touchstart', function(e) {
        e.preventDefault();
        $(this).attr('aria-pressed', function(index, value) {
            return 'false' === value ? 'true' : 'false';
        });
        $('body').toggleClass('is-visible');
        $(this).closest('nav, .sub-menu').slideToggle('fast');
    });
    //$( ".nav-primary" ).clone().appendTo( ".top-bar" ).addClass('stuck');


    // Hide Top bar on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var topbarHeight = 400;

    $(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var scrollTop = $(this).scrollTop();


        if (Math.abs(lastScrollTop - scrollTop) <= delta)
            return;


        if (scrollTop > lastScrollTop && scrollTop > topbarHeight) {
            if ($('body').hasClass('is-visible')) {
                return;
            } else {
                // Scroll Down
               // $('.hamburger-holder').removeClass('menu-close').addClass('menu-open');
            }
        } else {
            // Scroll Up
            if (scrollTop + $(window).height() < $(document).height()) {
                if (!$('body').hasClass('is-visible')) {
                 //   $('.hamburger-holder').removeClass('menu-open').addClass('menu-close');
                } else {
                    return;
                }
            }
        }

        lastScrollTop = scrollTop;
    }
