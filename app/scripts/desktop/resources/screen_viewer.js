(function($){
  ScreenViewer = function(container, options){
    this.$viewer = $(container);

    if (options) $.extend(this.settings, options);

    this._init();
  };

  ScreenViewer.prototype = {
    $viewer: null,
    $items: null,
    $images: null,

    current: 0,
    count: 0,
    loaded: 0,
    startTimeout: false,
    numTimeout: null,

    settings: {
      item: ".js-screen-viewer-item",
      image: ".js-screen-viewer-bg",
      currentClass: "state--current",
      readyClass: "state--ready",
      delaySwitch: 8000
    },

    _init: function(){
      var opts = this.settings;

      this.$items = this.$viewer.find(opts.item);
      this.$images = this.$viewer.find(opts.image);
      this.$images = this.$viewer.find(opts.image);
      this.$images = this.$viewer.find(opts.image);

      this.count = this.$items.length;

      if (this.count == 0) return;

      this.load();
    },

    load: function(target){
      var target = target || 0;

      var bg = this.$images.eq(target),
        url = bg.data("url");

      var img = new Image();
      img.src = url;

      var handler = function(){
        bg.css("background-image", "url(" + url + ")");

        if (target == 0) {
          this.switch(target);
          this.$viewer.addClass(this.settings.readyClass);
        }

        this.loaded++;

        if (this.count != 1) {
          if (target < this.count - 1) this.load(target + 1);

          if (!this.startTimeout) {
            this.timeout();
            this.startTimeout = true;
          }
        }
      }.bind(this);

      img.onload = handler;
      img.onerror = handler;
    },

    switch: function(target){
      var currentClass = this.settings.currentClass;

      this.$items.eq(this.current).removeClass(currentClass);
      this.$items.eq(target).addClass(currentClass);
      this.current = target;
    },

    next: function(target){
      if (target > this.loaded - 1) target = 0;

      this.switch(target);
    },

    timeout: function(){
      var delay = this.settings.delaySwitch;

      clearTimeout(this.numTimeout);
      this.numTimeout = setTimeout(function(){
        this.next(this.current + 1);
        this.timeout();
      }.bind(this), delay);
    }
  };
})(jQuery);


jQuery(function(){
  jQuery(".js-screen-viewer").each(function(){
    new ScreenViewer(this);
  });
})