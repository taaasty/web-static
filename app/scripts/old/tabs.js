(function($){
    var defaults = {
        nav: ".js-tabs-nav",
        trigger: ".js-tabs-nav-item",
        content: ".js-tabs-content",
        panel: ".js-tabs-panel",

        activeClass: "state--active",
        hiddenClass: "state--hidden",
        loadedClass: "state--loaded",

        ajax: false,

        onSuccess: function(){},
        onBeforeToggle: function(){},
        onAfterToggle: function(){},
        onBeforeRender: function(){}
    };

    Tabs = function(options){
        this.settings = $.extend({}, defaults, options);

        this.elements = {
            nav: null,
            trigger: null,
            content: null,
            panel: null
        };

        this.loaded = [];
        this.pages = [];

        this.current = 0;

        this.xhr = null;

        this.init();
    };

    Tabs.prototype = {
        init: function(){
            var self = this,
                options = self.settings,
                elements = self.elements;

            elements.nav = $(options.nav);
            elements.trigger = elements.nav.find(options.trigger);
            var targetName = elements.nav.data("target-name");
            elements.content = $(options.content + "[data-name=" + targetName + "]");
            elements.panel = elements.content.find(options.panel);

            for (var i = 0, count = elements.trigger.length; i < count; i++) {
                if(elements.trigger.eq(i).hasClass('state--active')) {
                    self.current = i;
                }

                self.pages[i] = 0;
                self.loaded[i] = elements.panel.eq(i).hasClass('state--loaded');

                if($('.next-page', elements.panel.eq(i)).length > 0) {
                    this.pages[i] = parseInt($('.next-page', elements.panel.eq(i)).data('page'));
                }
            }

            if(self.loaded[self.current]) {
                if ($.isFunction(options.onSuccess)) {
                    options.onSuccess({
                        triggers: self.elements.trigger,
                        panels: self.elements.panel,
                        currentIndex: self.current,
                        preventIndex: self.current,
                        page: 0
                    });
                }
            }

            self.open(elements.trigger.eq(self.current).attr("href"), self.current);

            self.events();

            $(window).scroll(function() {
                if(self.loaded[self.current] && $(window).scrollTop() > $(document).height() - $(window).height() && self.pages[self.current] >= 0) {
                    if($('.js-page-loader').hasClass(self.settings.hiddenClass)) {
                        $('.js-page-loader').removeClass(self.settings.hiddenClass);
                        self.getData(elements.trigger.eq(self.current).attr("href") + '?page=' + self.pages[self.current], self.current, self.pages[self.current])
                    }
                }
            });
        },

        events: function(){
            var self = this,
                activeClass = this.settings.activeClass,
                options = self.settings,
                elements = self.elements,
                trigger = elements.trigger;

            trigger.each(function(i){
                var url = this.href;

                $(this).on("click", function(e){
                    if (self.current != i) {
                        self.open(url, i);
                    }

                    e.preventDefault();
                });
            })
        },

        open: function(url, i){
            var self = this;

            if (self.settings.ajax && self.loaded[i] === false) {
                self.getData(url, i, 0);
            } else {
                self.toggle(i);
            }
        },

        getData: function(url, index, page){
            var self = this,
                options = self.settings;

            var bool = self.toggle(index);

            if (!bool) return;

            $.ajax({
                url: url,
                dataType: "html",
                success: function(data) {
                    if (data) {
                        $(".js-page-loader").addClass("state--hidden");
                        self.loaded[index] = true;

                        if ($.isFunction(options.onSuccess)) {
                            options.onSuccess({
                                triggers: self.elements.trigger,
                                panels: self.elements.panel,
                                currentIndex: index,
                                preventIndex: self.current,
                                page: page
                            });
                        }

                        self.renderData(data, index);
                    }
                },
                error: function() {
                    $(".js-page-loader").addClass("state--hidden");
                }
            });
        },

        toggle: function(index){
            var self = this,
                options = self.settings,
                activeClass = options.activeClass,
                hiddenClass = options.hiddenClass,
                elements = self.elements,
                trigger = elements.trigger,
                panel = elements.panel;

            if ($.isFunction(options.onBeforeToggle)) {
                var bool = options.onBeforeToggle({
                    triggers: self.elements.trigger,
                    panels: self.elements.panel,
                    currentIndex: index,
                    preventIndex: self.current
                })

                if (!bool) return;
            }

            trigger.eq(self.current).removeClass(activeClass);
            trigger.eq(index).addClass(activeClass);
            panel.eq(self.current).addClass(hiddenClass);
            panel.eq(index).removeClass(hiddenClass);

            if ($.isFunction(options.onAfterToggle)) {
                options.onAfterToggle({
                    triggers: self.elements.trigger,
                    panels: self.elements.panel,
                    currentIndex: index,
                    preventIndex: self.current
                })
            }

            self.current = index;

            return true;
        },

        renderData: function(data, index){
            this.pages[index] = parseInt($('.next-page', data).data('page'));

            this.elements.panel.eq(index).isotope('insert', $(data));
        }
    };
})(jQuery);
