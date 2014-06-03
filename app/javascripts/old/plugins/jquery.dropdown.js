(function($){
  var toggle = "[data-element=\"dropdown-toggle\"]",
    dropdown = "[data-element=\"dropdown-menu\"]",
    defaults = {
      activeClass: "state--expanded"
    },

  Dropdown = function(element, options) {
    this.options = $.extend({}, defaults, options);
    this.$container = $(element);

    this.init();
  };

  Dropdown.prototype = {
    // Variables
    $toggle: null,
    $dropdown: null,

    // Functions
    init : function(){
      this.$toggle = this.$container.find(toggle);
      this.$dropdown = this.$container.find(dropdown);

      this.$toggle
        .data("container", this.$container)
        .data("options", this.options);

      this.$toggle.on("click", this.toggle);
    },

    // Show/Hide Dropdown
    toggle : function(){
      var $this = $(this),
        activeClass = $this.data("options").activeClass,
        opened = (
          $this.data("opened") ||
          $this.data("container").hasClass(activeClass)
        );

      resetDropdown();

      $this
        .data("opened", opened == true ? false : true)
        .data("container")[opened == true ? "removeClass" : "addClass"](activeClass);

      return false;
    }
  };

  function resetDropdown(){
    $(toggle).each(function(){
      var $toggle = $(this);

      if (typeof $toggle.data("options") == "undefined") return;

      var activeClass = $toggle.data("options").activeClass,
        autoClose = ($toggle.data("container").data("autoclose") === false) ? false : true;

      if (autoClose) {
        $toggle.data("opened", false).data("container").removeClass(activeClass);
      }
    });
  }

  $.fn.dropdown = function(options){
    this.each(function(){
      new Dropdown(this, options);
    });
    return this;
  };

  $(function() {
    $(document).on("click", resetDropdown);
  });
})(jQuery);