(function($){
  Hero = function(options){
    if (options) $.extend(this.settings, options);

    this._init();
  };

  Hero.prototype = {
    // Elements
    $win: null,
    $htmlbody: null,
    $body: null,

    $hero: null,
    $box: null,
    $title: null,
    $text: null,
    $stats: null,
    $close: null,

    // Variables
    heightBox: null,
    opened: false,

    // Functions
    _init: function(){
      var opts = this.settings;

        this.$win = $(window);
        this.$htmlbody = $("html, body");
        this.$body = $("body");
        this.$hero = $(opts.hero);
        this.$box = $(opts.box);
        this.$title = $(opts.title);
        this.$text = $(opts.text);
        this.$stats = $(opts.stats);
        this.$open = $(opts.open);
        this.$close = $(opts.close);

        this._initEvents();
    },

    _initEvents: function(){
      var self = this;

      this.$open.on("click", this.open.bind(this));
      this.$close.on("click", this.close.bind(this));
      this.$win
        .on("load", this.load.bind(this))
        .on("resize", this.resize.bind(this))
        //.on("scroll", this.close.bind(this));
    },

    open: function(e){
      var heroEnabledClass = this.settings.heroEnabledClass,
        transitionEnd = "webkitTransitionEnd otransitionend oTransitionEnd " +
          "msTransitionEnd transitionend";

      if (!this.opened) {
        this.heightBox = this.getHeightBox();
        this.$htmlbody.scrollTop(0);

        this.$body.addClass(heroEnabledClass);
        this.setHeightWindowHero();

        this.$stats.on(transitionEnd, function(){
          this.opened = true;
          this.$stats.off(transitionEnd);
          this.$win.on("scroll.hero", this.close.bind(this));
        }.bind(this));

        this.settings.onOpen();
      }

      e.preventDefault();
    },

    close: function(e){
      if (this.opened) {
        var heroEnabledClass = this.settings.heroEnabledClass;

        this.$body.removeClass(heroEnabledClass);
        this.$hero.css("height", this.heightBox);
        this.$win.off("scroll.hero");

        this.opened = false;

        this.settings.onClose();
      }

      e.preventDefault();
    },

    resize: function(){
      if (this.opened)
        this.setHeightWindowHero();
    },

    load: function(){
      var opts = this.settings;

      if (!this.opened) {
        this.heightBox = this.getHeightBox();

        this.$hero
          .addClass(opts.noTransitionClass)
          .css("height", this.heightBox);

        setTimeout(function(){
          this.$hero.removeClass(opts.noTransitionClass);
        }.bind(this), 0);
      }
    },

    getHeightBox: function(){
      return this.$box.outerHeight();
    },

    getHeightWindow: function(){
      return this.$win.height();
    },

    setHeightWindowHero: function(){
      this.$hero.css("height", this.$win.height());
    }
  };

  Hero.prototype.settings = {
    hero: ".js-hero",
    box: ".js-hero-box",
    title: ".js-hero-title",
    text: ".js-hero-text",
    stats: ".js-hero-stats",
    open: ".js-hero-open",
    close: ".js-hero-close",

    heroEnabledClass: "hero-enabled",
    noTransitionClass: "no--transition",

    onOpen: function(){},
    onClose: function(){}
  };
})(jQuery);