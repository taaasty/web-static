(function($){
  PromoPopup = function(options){
    if (options) $.extend(this.settings, options);
    this._init();
  };

  PromoPopup.prototype = {
    // Elements
    $window: null,
    $html: null,
    $promoPopupIframe: null,
    $promoPopupIframeContents: null,
    $promoPopup: null,
    $promoPopupOpen: null,
    $promoPopupClose: null,
    $promoPopupContent: null,
    $promoPopupBox: null,
    $promoPopupNewTasty: null,

    // Vars
    loaded: false,

    // Functions
    _init: function(){
      var self = this,
        settings = self.settings;

      this.$window = $(window);
      this.$html = $('html');
      this.$promoPopupIframe = $(settings.promoPopupIframe);

      this.$promoPopupIframe.on('load', function(){
        self._lazyInit();
      })
    },

    _lazyInit: function(){
      var settings = this.settings;

      this.$promoPopupIframeContents = this.$promoPopupIframe.contents();

      this.$promoPopup = this.$promoPopupIframeContents.find(settings.promoPopup);
      this.$promoPopupOpen = $(settings.promoPopupOpen);
      this.$promoPopupClose = this.$promoPopupIframeContents.find(settings.promoPopupClose);
      this.$promoPopupContent = this.$promoPopupIframeContents.find(settings.promoPopupContent);
      this.$promoPopupBox = this.$promoPopupIframeContents.find(settings.promoPopupBox);
      this.$promoPopupNewTasty = this.$promoPopupIframeContents.find(settings.promoPopupNewTasty);

      this._initEvents();
    },

    _initEvents: function(){
      var self = this,
        settings = this.settings;

      this.$promoPopupOpen.on('click', function(e){
        self.$html.addClass(settings.promoPopupEnabledClass);
        self.show(e);
      });

      this.$promoPopupClose.on('click', function(e){
        setTimeout(function(){
          self.$html.removeClass(settings.promoPopupEnabledClass);
        }, 300);
        self.hide(e);
      });

      this.$promoPopupNewTasty.on('click', function(e){
        var disabledClass = settings.disabledClass;
        var href = $(e.currentTarget).attr('href');
        setTimeout(function(){
          window.location.href = href;
        },300);

        self.$promoPopupIframe.addClass(disabledClass).fadeOut(300, function(){
            $(this).removeClass(disabledClass);
          });

        e.preventDefault();
      });
    },

    show: function(e){
      if (!this.loaded) {
        this.loadCards();
      };

      this.$promoPopupIframe.fadeIn(300);
      this.$promoPopup.fadeIn(300);

      e.preventDefault();
    },

    hide: function(e){
      this.$promoPopupIframe.fadeOut(300);
      this.$promoPopup.fadeOut(300);

      e.preventDefault();
    },

    loadCards: function(){
      var self = this,
        settings = this.settings,
        countBoxes = this.$promoPopupBox.length,
        b = 0;

      this.$promoPopupBox.each(function(){
        var $box = $(this),
          $images = $box.find(settings.promoPopupBoxImage),
          countImages = $images.length,
          i = 0;

        $images.each(function(){
          var src = $(this).data('original');
          if(src == ''){
            countImages--;
            return;
          }

          var img = $('<img />');
          var handler= function(e){
            i++;

            if (i == countImages) {
              $box.addClass(settings.loadedClass);
              b++;
              if (b == countBoxes) self.loaded = true;
            }
          };

          img.on({error: handler, load: handler});
          img.attr('src', src);

        });
      });
    }
  };

  PromoPopup.prototype.settings = {
    promoPopupIframe: '.js-promo-popup-iframe',
    promoPopup: '.js-promo-popup',
    promoPopupOpen: '.js-promo-popup-open',
    promoPopupClose: '.js-promo-popup-close',
    promoPopupContent: '.js-promo-popup-content',
    promoPopupBox: '.js-promo-popup-box',
    promoPopupBoxSpinner: '.js-promo-popup-box-spinner',
    promoPopupBoxImage: '.js-promo-popup-box-image',
    promoPopupNewTasty: '.js-promo-popup-new-tasty',
    promoPopupEnabledClass: 'promo-popup-enabled',
    loadedClass: 'state--loaded',
    disabledClass: 'state--disabled'
  };
})(jQuery);

jQuery(function(){
  new PromoPopup();
});
