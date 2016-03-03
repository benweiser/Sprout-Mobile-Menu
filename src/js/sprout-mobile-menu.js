;
(function($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).
    var hamburgerClass = "hamburger-holder";

    // Create the defaults once
    var pluginName = "sproutMenu",
        defaults = {
            scrollFromTop: 100,
            hideOnScroll: false,
            menuText: "Menu",
            showMenuText: true,
            subMenuText: "Menu",
            showSubMenuText: false,
            hideFadeScreen: false,
            showHamburger: true,
            isFixed: true,
            isNotFixed: false,
            fadeScreenOpacity: .8
        };

    // The actual plugin constructor
    function SproutMobileMenu(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(SproutMobileMenu.prototype, {
        init: function() {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example bellow
            //this.yourOtherFunction("jQuery Boilerplate");
            this.buildTopLevelMarkup();
            this.buildSubLevelMarkup();
            this.createMenus();


            this.toggleMenus();
            this.fadeScreenOpacity();

            if (this.settings.hideOnScroll) {
                this.hideOnScroll();
            }

            this.isFixed();

        },
        fadeScreenOpacity: function() {
            $('.fade-screen').css('opacity', this.settings.fadeScreenOpacity);

        },
        createMenus: function() {
            $(this.element)
                .clone()
                .insertBefore(this.element)
                .attr({
                    'aria-hidden': true,
                    'aria-label': "Mobile Menu",
                    'class': "sliding-panel-content",
                    'id': "sliding-panel-content"
                })
                .before(this.buildTopLevelMarkup());

            $('.sliding-panel-content .sub-menu').before(this.buildSubLevelMarkup());

            $('.sliding-panel-content ul:first').removeClass();
        },
        buildTopLevelMarkup: function(HTML) {
            var HTML = '';
            HTML += '<div class="fade-screen"></div>';
            HTML += '<div class="hamburger-holder" aria-expanded="false" aria-pressed="false" role="button">';
            if (this.settings.showMenuText) {
                HTML += '<div class="menu-text">' + this.settings.menuText + '</div>';
            };
            if (this.settings.showHamburger) {
                HTML += '<div class="hamburger">';
                HTML += '<span></span><span></span><span></span>';
                HTML += '</div>';
            }
            HTML += '</div>';
            return HTML;
        },
        buildSubLevelMarkup: function(HTML) {
            var HTML = '';
            HTML += '<div class="sub-menu-toggle" role="button" aria-pressed="false" aria-expanded="false">';
            HTML += '<span>+</span>';
            if (this.settings.showSubMenuText) {
                HTML += '<div class="submenu-text">' + this.settings.subMenuText + '</div>';
            }
            HTML += '</div>';
            return HTML;

        },
        toggleMenus: function() {

            function attrToggle(index, value) {
                return 'false' === value ? 'true' : 'false';
            }


            $(".siding-panel-content ul:not(:first)").attr('aria-hidden', 'true');

            $('.hamburger-holder, .fade-screen').on('click', function() {

                $('.hamburger-holder')
                    .attr('aria-pressed', attrToggle)
                    .attr('aria-expanded', attrToggle);

                $('.sliding-panel-content').
                attr('aria-hidden', attrToggle);

                $('body').toggleClass('is-visible');
            });

            $('.sub-menu-toggle').on('click', function() {
                $(this)
                    .toggleClass('activated')
                    .attr('aria-pressed', attrToggle)
                    .attr('aria-expanded', attrToggle)

                $(this).next('.sub-menu').attr('aria-hidden', attrToggle).slideToggle();
            });

            $('.sub-menu-toggle').prev('a').addClass('truncate');
        },
        hideOnScroll: function() {

            // Hide Top bar on on scroll down
            var didScroll;
            var lastScrollTop = 0;
            var delta = 5;
            var topbarHeight = 200;

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
                var scrollTop = $(window).scrollTop();

                if (Math.abs(lastScrollTop - scrollTop) <= delta) {
                    return;
                }


                if (scrollTop > lastScrollTop && scrollTop > topbarHeight) {
                    $('.hamburger-holder').addClass('menu-open');
                } else {
                    if (scrollTop + $(window).height() < $(document).height()) {
                        $('.hamburger-holder').removeClass('menu-open');


                    }
                }

                lastScrollTop = scrollTop;
            }


        },
        isFixed: function() {
            if (this.settings.isFixed) {
                $('.hamburger-holder').addClass('is-fixed');
            } else if (!this.settings.isFixed) {
                $('.hamburger-holder').addClass('is-not-fixed').parent().css('position', 'relative');
                $('body').css('overflow-x', 'hidden');
            }
        },

    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new SproutMobileMenu(this, options));
            }
        });
    };


    $('.nav-primary').sproutMenu(sprout_menu_options);

})(jQuery, window, document);


//document.body.addEventListener('touchstart', function() {}, false);