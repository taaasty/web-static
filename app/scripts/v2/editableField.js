(function($){
  EditableField = function(field, options){
    this.options = $.extend({}, this.settings, options);

    this.elements = {
      field: null,
      control: null,
      content: null,
      placeholder: null,
      value: null,
      button: null
    };

    this.elements.field = $(field);

    this.init();
  };

  EditableField.prototype = {
    settings: {
      control: ".js-editable-field-control",
      content: ".js-editable-field-content",
      placeholder: ".js-editable-field-placeholder",
      value: ".js-editable-field-value",
      button: ".js-editable-field-button",

      emptyClass: "state--empty",
      editingClass: "state--editing",

      onReact: null
    },

    init: function(){
      var elements = this.elements,
        options = this.options;

      elements.control = elements.field.find(options.control);
      elements.content = elements.field.find(options.content);
      elements.placeholder = elements.field.find(options.placeholder);
      elements.value = elements.field.find(options.value);
      elements.button = elements.field.find(options.button);

      this.setup();
      this.events();
    },

    setup: function(){
      var elements = this.elements,
        field = elements.field,
        control = elements.control;

      this.switchEmptyState();

      if ($.fn.autosize) {
        control.autosize();
      }

      control.maxlength({
        max: control.attr("maxlength") || 140,
        showFeedback: false
      });
    },

    events: function(){
      var elements = this.elements,
        options = this.options,
        control = elements.control;

      control.on("keydown input paste", function(e){
        if ($.isFunction(options.onReact)) {
          options.onReact(e);
        }

        setTimeout(function(){
          control.val(control.val().replace(/\n/g, ""));
          elements.value.html(control.val());
          control.trigger("autosize.resize");
        }, 0)
      });

      elements.button.on("click", function(){
        elements.field.removeClass(options.emptyClass).addClass(options.editingClass);
        control.trigger("focus");
      });

      control.on("blur", function(){
        elements.field.removeClass(options.editingClass);
        this.switchEmptyState();
      }.bind(this));
    },

    switchEmptyState: function(){
      var elements = this.elements,
        emptyClass = this.options.emptyClass;

      if (elements.control.val().trim() == "") {
        elements.field.addClass(emptyClass);
      } else {
        elements.field.removeClass(emptyClass);
      }
    }
  };
})(jQuery);