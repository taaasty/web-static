(function($){
  var defaults = {
    search: ".js-filter-search",
    button: ".js-filter-search-button",
    input: ".js-filter-search-input",

    activeClass: "state--active",
    focusClass: "state--focus"
  };

  FilterSearch = function(options){
    this.settings = $.extend({}, defaults, options);

    this.elements = {
      search: null,
      button: null,
      input: null
    };

    this.init();
  };

  FilterSearch.prototype = {
    support: {
      touch: (!!('ontouchstart' in window) || !!('msmaxtouchpoints' in navigator))
    },

    init: function(){
      var self = this,
        options = self.settings,
        elements = self.elements;

      elements.search = $(options.search);
      elements.button = elements.search.find(options.button);
      elements.input = elements.search.find(options.input);

      self.events();
    },

    events: function(){
      var self = this,
        activeClass = this.settings.activeClass,
        focusClass = this.settings.focusClass,
        elements = self.elements,
        button = elements.button,
        input = elements.input,
        search = elements.search;

      button.on((!this.support.touch) ? "click" : "touchstart", function(e){
        self.toggle();
        e.preventDefault();
      });

      input.on("focus", function(){
        search.addClass(focusClass);
      });

      input.on("blur", function(){
        if (this.value == "") {
          search.removeClass(activeClass);
        }

        search.removeClass(focusClass);
      });
    },

    toggle: function(){
      var activeClass = this.settings.activeClass,
        elements = this.elements,
        search = elements.search,
        input = elements.input;

      if (!search.hasClass(activeClass)) {
        input.select();
        search.addClass(activeClass);
      } else {
        input.trigger("blur");
      }
    }
  };
})(jQuery);

jQuery(function(){
  new FilterSearch();
});