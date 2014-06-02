(function($){
  var pluginName = "expander",
    defaults = {
      activeClass: "state--active",
      hiddenClass: "state--hidden"
    };

  $.fn[pluginName] = function(options){
    return this.each(function(){
      var settings = $.extend({}, defaults, options),
        trigger = $(this),
        name = trigger.data("expander-target"),
        triggers = $("[data-expander-target=\"" + name + "\"]"),
        blocks = $("[data-expander-name=\"" + name + "\"]");

      trigger.on("click", function(){
        blocks.toggleClass(settings.hiddenClass);
        triggers.toggleClass(settings.activeClass);
      });
    });
  };
})(jQuery);