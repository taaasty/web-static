(function($){
  GuidePopup = function(options){
    if (options) $.extend(this.settings, options);

    this._init();
  };

  GuidePopup.prototype = {
    // Elements
    $popup: null,
    $pages: null, // block pages of guide
    $page: null,
    $media: null,
    $mediaItem: null,
    $next: null, // button forward
    $navItem: null,

    // Variables
    count: null, // length of pages
    current: 0, // active page
    finished: false,

    pagesData: {},
    mediaData: {},
    posData: {},

    // Functions
    _init: function(){
      var self = this,
        settings = self.settings;

        this.$popup = $(settings.popup);
        this.$pages = this.$popup.find(settings.pages);
        this.$page = this.$popup.find(settings.page);
        this.$media = this.$popup.find(settings.media);
        this.$mediaItem = this.$popup.find(settings.mediaItem);
        this.$next = this.$popup.find(settings.next);

        this.count = this.$page.length;

        // jQuery Connection initialization
        $('.js-connection-start').connection({
          connectionEnd: '.js-connection-end',
          connectionLineClass: 'guide-popup__connection-line'
        });

        this._collectData(this.pagesData, this.$page);
        this._collectData(this.mediaData, this.$mediaItem);

        this.initNav();

        this.animate(this.current);

        this._initEvents();
    },

    _collectData: function(objectData, collection){
      $.map(collection, function(item, i){
        var id = $(item).data('media-id');

        if (id) {
          objectData[i] = id;
        }
      });
    },

    _initEvents: function(){
      var self = this;

      this.$next.on('click', function(e){
        e.preventDefault();

        self.animate(self.current + 1);
      });
    },

    initNav: function(){
      this.createNav();
      this.initEventsNav();
    },

    createNav: function(){
      var settings = this.settings,
        nav = '',
        navItems = '';

      for (var i = 0, active; i < this.count; i++) {
        navItems +=
          '<div class="' + settings.navItemClass + '">' +
            '<i class="' + settings.navItemClass + '-i">' +
              i +
            '</i>' +
          '</div>';
      }

      nav += '<div class="' + settings.navClass + '">' + navItems + '</div>';

      this.$popup.prepend(nav);

      this.$navItem = this.$popup.find('.' + settings.navItemClass);
    },

    initEventsNav: function(){
      var self = this;

      self.$navItem.on('click', function(){
        var target = $(this).index();

        if (self.current != target) {
          self.animate(target);
        }
      });
    },

    changeNavItem: function(target){
      var settings = this.settings;

      this.$navItem
        .eq(this.current).removeClass(settings.activeClass)
        .end()
        .eq(target).addClass(settings.activeClass);
    },

    changePage: function(target){
      var self = this,
        settings = this.settings,
        oldMediaId, newMediaId,
        clearClasses = '' +
          settings.activeClass + ' ' +
          settings.afterClass + ' ' +
          settings.beforeClass;

      this.$page
        .removeClass(clearClasses)
        .each(function(i){
          var newClass = '';

          newMediaId = self.pagesData[i];

          if (i < target) {
            newClass = settings.beforeClass;

            if (newMediaId && oldMediaId != newMediaId) {
              self.posData[newMediaId] = 'before';
            }
          } else if (i > target) {
            newClass = settings.afterClass;

            if (newMediaId && oldMediaId != newMediaId) {
              self.posData[newMediaId] = 'after';
            }
          } else if (i == target) {
            newClass = settings.activeClass;
            oldMediaId = newMediaId;

            if (newMediaId) {
              self.posData[newMediaId] = 'active';
            }
          }

          $(this).addClass(newClass);
        });

      this.$mediaItem
        .removeClass(clearClasses)
        .each(function(i){
          var newClass = '';

          switch (self.posData[self.mediaData[i]]) {
            case 'before': newClass = settings.beforeClass;
              break;
            case 'after': newClass = settings.afterClass;
              break;
            case 'active': newClass = settings.activeClass;
              break;
          }

          $(this).addClass(newClass);
        });
    },

    animate: function(target){
      var finished = this.endGuide(target);

      if (!finished) { // or flag this.finished
        this.changeNavItem(target);
        this.changePage(target);
        this.setCurrent(target);
      } else {
        var guideEnabledClass = this.settings.guideEnabledClass;

        $('.' + guideEnabledClass).removeClass(guideEnabledClass);

        var expires = new Date(Date.now());
        expires.setFullYear(expires.getFullYear()+1);
        setCookie('saw_guide',true,{expires:expires});
      }
    },

    endGuide: function(target){
      var settings = this.settings;

      if (target > this.count - 1) {
        this.$popup.fadeOut(300);
        this.finished = true;
      } else {
        this.finished = false;
      }

      var action = (target >= this.count - 1 ? 'addClass' : 'removeClass');

      this.$next[action](settings.activeClass);

      return this.finished;
    },

    setCurrent: function(target){
      this.current = target;
    }
  };

  GuidePopup.prototype.settings = {
    popup: '.js-guide-popup',
    pages: '.js-guide-popup-pages',
    page: '.js-guide-popup-page',
    media: '.js-guide-popup-media',
    mediaItem: '.js-guide-popup-media-item',
    next: '.js-guide-popup-next',
    navClass: 'guide-popup__nav',
    navItemClass: 'guide-popup__nav-item',
    guideEnabledClass: 'guide-popup-enabled',

    activeClass: 'state--active',
    afterClass: 'is--after',
    beforeClass: 'is--before'
  };
})(jQuery);

jQuery(function(){
  new GuidePopup();
});