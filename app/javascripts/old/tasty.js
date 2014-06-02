(function($){
    Tasty = function(){this._init();}
    Tasty.prototype = {
        design: null,
        checkBackground: false,
        win: null,
        doc: null,

        _init: function(){
            this.win = $(window);
            this.doc = $(document);

            this.doc.ready(this.onReady.bind(this));
            this.win.load(this.onLoad.bind(this))
            this.win.keyup(this.onKeyUp.bind(this));
            this.win.resize(this.onResize.bind(this));
        },

        onReady: function(){
            if($('body').hasClass('layout--feed')){
                console.log('setup feed');
                Tasty.setupLiveFeed();
            }
            if($('body').hasClass('layout--tlog')){
                Tasty.setupTlog();
            }

            Tasty.centerHorizontally(".js-horizontal-centering");
            $(".js-scroller-pane").on("mousewheel", Tasty.onMousewheel);

            var $win = this.win;
            if (Modernizr.touch){
                new Hero({
                    open: ".js-hero-open:not(.js-userbar-toggle)",
                    onOpen: function(){
                        $win.trigger("hidePopup");
                    },
                    onClose: function(){
                        $win.trigger("hidePopup");
                    }
                });

                $(".js-userbar-toggle").on("click", function(){
                    $(".js-userbar").toggleClass("state--active");

                    return false;
                });
            } else {
                new Hero({
                    onOpen: function(){
                        $win.trigger("hidePopup");
                    },
                    onClose: function(){
                        $win.trigger("hidePopup");
                    }
                });
            }

            $(".js-dropdown").dropdown();

        },

        onResize: function(){
            if(this.checkBackground){
                BackgroundCheck.refresh();
            }
        },

        onLoad: function(){
            Tasty.centerHorizontally(".js-horizontal-centering");

            if(this.checkBackground){
                BackgroundCheck.refresh();
            }
        },

        onKeyUp: function(event){
        },

        notify: function(type,text,timeout){
            if(['error','success'].indexOf(type) == -1){
                throw new Error('Notification type "'+type+'" is unknown');
            }
            if(typeof timeout == 'undefined' || parseInt(timeout) == 0){
                timeout = 10000;
            }

            var notice = $('#tmpl-notice').render({type:type,text:text});
            notice = $(notice);
            notice.appendTo($('body'));
            notice.addClass('notice--'+type);
            notice.css({marginLeft: -(notice.width()/2)})
            notice.click(function(){$(this).remove();});
            setTimeout(function(){
                notice.remove();
            },timeout);
        },

        setupLiveFeed:function(){
            var blocked = false;

            var tabsFeed = new Tabs({
                nav: ".js-isotope-filter",
                trigger: ".js-isotope-filter-item",
                content: ".js-isotope-content",
                panel: ".js-isotope-box",

                ajax: true,

                onSuccess: function(e){
                    var currentPanel = e.panels.eq(e.currentIndex);

                    currentPanel.find(".bricks__loader").addClass("state--hidden");

                    if(e.page == 0) {
                        currentPanel.isotope({
                            itemSelector: ".js-isotope-item",
                            transitionDuration: 0,
                            masonry: {
                                isFitWidth: true
                            }
                        });
                    }

                    //currentPanel.isotope('reloadItems').isotope('layout');

                    setTimeout(function(){ // Temp fix
                        var imgs = currentPanel.find(".image img").filter(function(){return !$(this).data("loaded");}),
                            count = imgs.length,
                            loaded = 0;

                        imgs.one("load error", function(){
                            loaded++;
                            $(this).data("loaded", true);

                            if (loaded >= count) currentPanel.isotope("layout");
                        });
                    }, 10);
                },

                onBeforeToggle: function(e){
                    if (blocked) return false;

                    blocked = true;

                    var heroBox = $(".hero__box"),
                        heroSlide = heroBox.find(".hero__slide"),
                        currentHeroSlide = heroSlide.eq(e.currentIndex),
                        preventHeroSlide = heroSlide.eq(e.preventIndex),
                        currentClass = "state--current",
                        animateInClass = "animate--in",
                        animateOutClass = "animate--out";

                    preventHeroSlide.addClass(animateOutClass).fadeOut(300, function(){ // TODO: Вынести логику анимации в css
                        $(this).removeClass(currentClass + " " + animateOutClass);
                        blocked = false;
                    });

                    currentHeroSlide.show();
                    var marginTop = currentHeroSlide.outerHeight() / 2;
                    currentHeroSlide.hide();

                    currentHeroSlide
                        .addClass(animateInClass)
                        .css({"margin-top": -marginTop}).fadeIn(300, function(){
                            $(this).removeClass(animateInClass).removeAttr("style").addClass(currentClass);
                            heroBox.css({"height": "auto"}).css({
                                "height": currentHeroSlide.height()
                            });
                        });

                    return true;
                },

                onAfterToggle: function(e){
                    var preventPanel = e.panels.eq(e.preventIndex),
                        currentPanel = e.panels.eq(e.currentIndex);

                    if (typeof preventPanel.data("isotope") != "undefined") {
                        preventPanel.isotope("unbindResize");
                    }

                    if (typeof currentPanel.data("isotope") != "undefined") {
                        currentPanel.isotope("bindResize");
                        currentPanel.isotope("layout");
                    }
                }
            });

            var scollFade = function(W, container, element){
                var height = container.outerHeight() - element.outerHeight() / 2,
                    scrollTop = W.scrollTop();

                element.css({
                    "margin-top": scrollTop,
                    "opacity": Math.max(1 - scrollTop / height, 0)
                });
            };

            var win = $(window),
                hero = $(".hero"),
                heroBox = hero.find(".hero__box");

            win.on("scroll", function(){scollFade($(this), hero, heroBox);})
                .on("load", function(){$(this).trigger("scroll");})
                .trigger("scroll");
        },

        setupTlog:function(){
            if($(".js-post-editor").length>0){
                new PostEditor();
            }

            Tasty.setupFeed();
            Tasty.setupHero();

            this.checkBackground = $('body').hasClass('tlog-headercolor-auto');

            this.design = new Design({
                saveUrl: TastyAPI.url('user','save'),
                onChange: function(key,val){
                    if(key == 'layout-cover' && this.checkBackground)
                        BackgroundCheck.refresh();
                }
            });

            var bgcolor = $('.b-page .b-cover').css('background-color');

            if(this.checkBackground){
                this.backgroundCheck = BackgroundCheck.init({
                    targets: '.hero__mask',
                    images: '.js-cover',
                    maxDuration: 1000,
                    windowEvents: false,
                    debug: false
                });
            }

        },

        setupVideos:function(){
            $('.video .video__overlay').click(function(){
                var embed = $(this).parents('.video').find('.video__embed')
                embed.show().append($(embed).data('frame'));
                embed.find('iframe').attr({width:712, height:400});
            });
        },

        setupFeed: function(){
            $('.confirmation__close, .confirmation__fader').click(function(){
                $('body').removeClass('confirmation-enabled');
                $('.confirmation').hide();
            });
            $('.js-alert-close').click(function(){
                $('.js-alert').hide();
            });

            Tasty.setupVideos();

            $('.js-post').each(function(i,entry){
                var entryId=$(entry).data('id');
                var commentsCount = null;

                if(typeof comments_views_update !== "undefined") {
                    var commentsCount = $.grep(comments_views_update, function(e) {
                        return e['id'] == entryId;
                    });

                    if(commentsCount.length == 1) {
                        commentsCount = commentsCount[0]['comments_count'];
                    } else {
                        commentsCount = null;
                    }
                }

                var isFaved = null;
                if(typeof entry_faves_update !== "undefined") {
                    isFaved = $.grep(entry_faves_update, function (e) {
                        return e['id'] == entryId;
                    }).length > 0;
                }

                new Comments(entry, {
                    opened: $(entry).hasClass('js-post-single'),
                    entryId: entryId,
                    commentsCount: commentsCount,
                    onUpdateCommentsCount: function(count) {
                        if(count > 0) {
                            $('.js-comments-toggle', entry).html(count + " " + Tasty.declension(count, ['комментарий', 'комментария', 'комментариев']));
                        } else {
                            $('.js-comments-toggle', entry).html("Комментировать");
                        }
                    },
                });

                $(entry).find('.js-post-report').on('click',function(e){
                    $('.confirmation').show();
                    $('body').addClass('confirmation-enabled');
                    $('.confirmation .confirmation__text').html("Вы действительно хотите пожаловаться на запись?");
                    $('.confirmation .button__text').html("Подать жалобу");

                    $('.confirmation .button').off('click').on('click', function() {
                        $('.confirmation').hide();
                        $('body').removeClass('confirmation-enabled');

                        TastyAPI.request('entry', 'report', entryId, {
                            success: function(data) {
                                Tasty.notify('success', 'Спасибо, роскомнадзор разберется');
                            },
                            error: function(error) {
                                Tasty.notify('error', error.message);
                            }
                        });
                    });

                    e.preventDefault();
                });

                $(entry).find('.js-post-delete').on('click',function(e){
                    $('.confirmation').show();
                    $('body').addClass('confirmation-enabled');
                    $('.confirmation .confirmation__text').html("Вы действительно хотите удалить запись?<br />Её нельзя будет восстановить.");
                    $('.confirmation .button__text').html("Удалить запись");

                    $('.confirmation .button').off('click').on('click', function() {
                        $('.confirmation').hide();
                        $('body').removeClass('confirmation-enabled');

                        TastyAPI.request('entry', 'delete', entryId, {
                            success: function(data) {
                                $(entry).fadeOut(500,function(){
                                    $(entry).slideUp(200,function(){$(this).remove();});
                                });
                            },
                            error: function(error) {
                                Tasty.notify('error', error.message);
                            }
                        });
                    });

                    e.preventDefault();
                });

                $(entry).find('.js-post-subscribe').on('click',function(){
                    var control = $(this);
                    if(control.hasClass('state--subscribed')){
                        var method = 'unsubscribe';
                    }else{
                        var method = 'subscribe';
                        control.addClass('voted');
                    }
                    TastyAPI.request('entry',method,entryId,{
                        success: function(response){
                            control.toggleClass('state--subscribed', (method == 'subscribe'));
                            if(method == 'subscribe') {
                                Tasty.notify('success', 'Вы были подписаны на комментарии к этой записи');
                            } else {
                                Tasty.notify('success', 'Вы были отписаны от комментариев к этой записи');
                            }
                        },
                        error: function(response){
                            Tasty.notify('error',response.error.message);
                        }
                    });
                    return false;
                });


                $(entry).find('.js-vote').on('click',function(){
                    var control = $(this);
                    if(!control.hasClass('voted')){
                        control.addClass('voted');
                        TastyAPI.request('entry','vote',entryId,{
                            success: function(response) {
                                Tasty.notify('success', 'Спасибо за ваш голос');
                                control.html(response.value);
                            },
                            error: function(response){
                                Tasty.notify('error', response.error.message);
                            }
                        });
                    }
                });

                if(isFaved !== null ) {
                    $(entry).find('.js-post-favorites').toggleClass('state--faved', isFaved);
                }

                $(entry).find('.js-post-favorites').on('click', function() {
                    var control = $(this);

                    if(control.hasClass('state--faved')){
                        var method = 'unfave';
                    }else{
                        var method = 'fave';
                    }

                    control.toggleClass('state--faved', (method == 'fave'));

                    TastyAPI.request('entry', method, entryId, {
                        success: function(response){
                            if(method == 'fave') {
                                Tasty.notify('success', 'Запись теперь в избранном');
                            } else {
                                Tasty.notify('success', 'Запись удалена из избранного');

                                if($('body').hasClass('tlog-mode-own-faves')){
                                    $(entry).fadeOut(500,function() {
                                        $(entry).slideUp(200,function(){$(this).remove();});
                                    });
                                }
                            }
                        },
                        error: function(response) {
                            Tasty.notify('error', response.error.message);
                        }
                    });

                    return false;
                });
            });

        },

        setupHero: function(){
            $('.js-subscribe').click(function(){
                var userId = $(this).data('id');
                var method = $(this).hasClass('state--active') ? 'unsubscribe' : 'subscribe';
                $('.toolbar--userbar .follow-status').toggleClass('state--hidden', $(this).hasClass('state--active'));
                $(this).toggleClass('state--active');
                TastyAPI.request('user', method, userId);
            });
        },

        setCookie: function(key,value){
            var domain = '.'+window.location.host.replace(/([a-z0-9-]+)\.([a-z0-9-]+\.[a-z0-9-]+)/i,'$2')
            docCookies.setItem('popup-firends-active',1,Infinity,'/',domain);
        },

        getCookie: function(key){
            return docCookies.getItem(key);
        },

        prepareAvatar: function(username,url){
            var letter = username.toUpperCase().charAt(0);
            var styles = [
                'first', 'second', 'third', 'fourth', 'fifth'
            ];
            var index = 90 - letter.charCodeAt(0)
            var style = styles[Math.round(index/(styles.length+1))]

            return {userpic:url, style:style, letter:letter};
        }
    };

    Tasty = new Tasty();
})(jQuery);
