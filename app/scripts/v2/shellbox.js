(function($){
  Shellbox = function(handler, options){
    this.options = $.extend({}, this.settings, options);
    this.elements = {
      win: null,
      html: null,
      shellbox: null,
      open: null,
      close: null
    };
    this.elements.open = $(handler);

    this.init();
  };

  Shellbox.prototype = {
    settings: {
      shellbox: ".shellbox",

      cellClass: "shellbox__cell",
      enabledClass: "shellbox-enabled",

      speed: 300,

      onInit: function(){},
      onOpen: function(){},
      onClose: function(){}
    },

    disabled: false,

    // Functions
    init: function(){
      var self = this,
        options = self.options,
        elements = self.elements,
        name = elements.open.data("shellbox-target");

      elements.win = $(window);
      elements.html = $("html");
      elements.shellbox = $(options.shellbox + "[data-shellbox-name=\"" + name + "\"]");

      if (elements.shellbox.length == 0) return;

      this.open();
      this.events();

      if ($.isFunction(options.onInit)) {
        options.onInit({
          shellbox: elements.shellbox
        });
      }
    },

    events: function(){
      var self = this,
        elements = self.elements;

      elements.open.on("click", function(e){
        self.show(e.target);
        e.preventDefault();
      });

      elements.shellbox.on("click", function(e) {
        if ($(e.target).hasClass(self.options.cellClass)) {
          self.hide();
          e.preventDefault();
        };
      });

      elements.win.on("shellbox:hide", function(){
        self.hide();
      });
    },

    show: function(handler){
      if (this.disabled) return;

      var elements = this.elements,
        options = this.options,
        scrollTop = elements.win.scrollTop();

      elements.win.trigger("shellbox:hide");

      elements.html.addClass(options.enabledClass);

      elements.shellbox.fadeIn(options.speed);

      elements.win.scrollTop(scrollTop);

      if ($.isFunction(options.onOpen)) {
        options.onOpen({
          shellbox: elements.shellbox,
          handler: $(handler)
        });
      }
    },

    hide: function(){
      if (this.disabled) return;

      var elements = this.elements,
        options = this.options,
        scrollTop = elements.win.scrollTop();

      if (!elements.shellbox.is(":visible")) return;

      elements.shellbox.fadeOut(options.speed, function(){
        elements.html.removeClass(options.enabledClass);

        elements.win.scrollTop(scrollTop);

        if ($.isFunction(options.onClose)) {
          options.onClose({
            shellbox: elements.shellbox
          });
        }
      });
    },

    open: function(){
      if (this.elements.shellbox.data("opened")) this.show();
    },

    enable: function(){
      this.disabled = false;
    },

    disable: function(){
      this.disabled = true;
    }
  };
})(jQuery);

// TODO: Вынести в tasty.js
jQuery(function(){
  function clearClasses(element, prefix){
    var pattern = new RegExp("^" + prefix + "\\w+"),
      classes = element.attr("class").split(/\s+/);

    for(var i = 0; i < classes.length; i++){
      var className = classes[i];

      if(className.match(pattern)){
        element.removeClass(className);
      }
    }
  };

  var defaultSection = "",
    prefix = "is--";
    initAutosizeInput = false;

  var auth = new Shellbox($("[data-shellbox-target=\"auth\"]"), {
    speed: 0,
    onInit: function(obj){
      var authJumper = obj.shellbox.find(".js-auth-jumper");

      defaultSection = obj.shellbox.data("default-section");

      authJumper.each(function(){
        var jumper = $(this),
          section = jumper.data("section");

        jumper.on("click", function(e){
          clearClasses(obj.shellbox, prefix);
          obj.shellbox.addClass(prefix + section);

          e.preventDefault();
        });
      });

      obj.shellbox.find(".form-field--binary").on("click", function(){
        $(this).find("input").trigger("focus");
      });
    },

    onOpen: function(obj){
      if (!initAutosizeInput) {
        obj.shellbox.find("[role=\"autosize-input\"]").autosizeInput({space: 0});
        initAutosizeInput = true;
      }

      var section = obj.handler.data("section") || defaultSection;

      obj.shellbox.addClass(prefix + section);
    },

    onClose: function(obj){
      clearClasses(obj.shellbox, prefix);
    }
  });
})
