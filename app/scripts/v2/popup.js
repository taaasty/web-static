(function($){
  Popup = function(handler, options){
    this.options = $.extend({}, this.settings, options);

    this.elements = {
      win: null,
      html: null,
      toggle: handler,
      container: null,
      popup: null,
      headBox: null,
      close: null,
      loader: null,
    };

    this.templates = {
      arrow: "<div class=\"popup__arrow popup__arrow--{dir}\"></div>",
      container: "" +
        "<div class=\"popup-container\">" +
          "<div class=\"popup-container__main\">" +
            "<div class=\"popup-container__cell\">" +
          "</div>" +
        "</div>"
    };

    this._init();
  };

  Popup.prototype = {
    opened: false,

    _init: function(){
      var elements = this.elements,
        options = this.options

      elements.win = $(window);
      elements.html = $("html");

      if(typeof options.popupSelector != 'undefined'){
        var popupSelector = options.popupSelector;
      }else{
        var popupSelector = elements.toggle.data("popup-selector");
      }

      if (typeof popupSelector == "undefined") return;

      var popup = elements.popup = $(popupSelector);
      elements.headBox = popup.find(options.headBox);
      elements.close = popup.find(options.close);
      elements.loader = popup.find(options.loader);

      this.setup();
      this._initEvents();

      if(options.hash && window.location.hash == options.hash){
        this.show();
      }
    },

    _initEvents: function(){
      var elements = this.elements,
        options = this.options;

      elements.toggle.on("click", this.display.bind(this));
      elements.close.on("click", this.hide.bind(this));
      elements.popup.on("change", this.change.bind(this));

      elements.win
        .on("resize", this.resize.bind(this))
        .on("scroll", this.scroll.bind(this))
        .on("hidePopup", this.hide.bind(this));

      if (!options.wrapContainer) return;

      elements.container.on("click", function(e) {
        if ($(e.target).hasClass(options.containerCellClass)) {
          this.hide();
          e.preventDefault();
        };
      }.bind(this));
    },

    setup: function(){
      var elements = this.elements,
        options = this.options,
        popuper = null;

      if (options.wrapContainer) {
        this.renderContainer();
        popuper = elements.container = elements.popup.closest(options.container);
      } else {
        popuper = elements.popup;
      }

      popuper.show();

      this.setPosition();

      if (options.relativeTarget && !options.wrapContainer) {
        switch (options.position) {
          case "top":
            this.renderArrow("down");
            break;
          case "bottom":
            this.renderArrow("up");
            break;
          default:
            alert("Not correctly defined value position");
            break;
        }
      };

      if ($.isFunction(options.onInit)) {
        options.onInit(popuper);
      }

      if (options.draggable && !options.wrapContainer) {
        this.draggable();
      }

      popuper.hide();
    },

    display: function(e){
      (!this.opened) ? this.show(e) : this.hide(e);

      if(typeof e != "undefined") {
        e.preventDefault();
      }
    },

    show: function(e){
      var elements = this.elements,
        options = this.options,
        popuper = (options.wrapContainer) ? elements.container : elements.popup;

      this.clear();

      popuper.show();

      if ($.isFunction(options.onBeforeOpen)) {
        options.onBeforeOpen(popuper);
      }

      elements.toggle.addClass(options.activeClass);

      this.setPosition();

      popuper.hide();

      if (options.wrapContainer) {
        var scrollTop = elements.win.scrollTop();

        elements.html.addClass(options.enabledClass);
        elements.win.scrollTop(scrollTop);
      }

      popuper.fadeIn(options.duration, function(){
        if ($.isFunction(options.onAfterOpen)) {
          options.onAfterOpen();
        }
      });

      this.opened = true;

      if (typeof e != "undefined") {
        e.preventDefault();
      }
    },

    hide: function(e){
      var elements = this.elements,
        options = this.options,
        popuper = (options.wrapContainer) ? elements.container : elements.popup;
        visible = popuper.is(":visible");

      if (!visible) return;

      if ($.isFunction(options.onBeforeClose)) {
        options.onBeforeClose();
      }

      elements.toggle.removeClass(options.activeClass);

      var scrollTop = elements.win.scrollTop();

      popuper.fadeOut(options.duration, function(){
        if (options.wrapContainer) {
          elements.html.removeClass(options.enabledClass);
          elements.win.scrollTop(scrollTop);
        }

        options.onAfterClose();
      });

      this.opened = false;

      if (typeof e != "undefined") {
        e.preventDefault();
      }
    },

    resize: function(e){
      (!this.options.closeResizing) ? this.setPosition() : this.hide(e);
    },

    scroll: function(e){
      if (this.options.closeScrolling) this.hide(e);
    },

    change: function(e){
      var options = this.options;

      if ($.isFunction(options.onChange)) {
        options.onChange(e);
      }
    },

    update: function(){
      this.setPosition();
    },

    clear: function(){
      this.elements.win.trigger("hidePopup");
    },

    draggable: function(){
      var elements = this.elements,
        options = this.options,
        popup = elements.popup,
        handleClass = options.headBox;

      elements.headBox.addClass(options.dragCursorClass);

      popup.draggable({
        handle : handleClass,
        containment : options.containment,
        drag: function(){
          popup.addClass(options.noTransitionClass);
        },
        stop : function(){
          popup.removeClass(options.noTransitionClass);
        }
      });
    },

    toggleLoader: function(bool){
      var elements = this.elements,
        hiddenClass = this.options.hiddenClass;

      if (elements.loader) {
        elements.loader.toggleClass(hiddenClass, !bool);
      }
    },

    setPosition: function(){
      var options = this.options;

      if (options.wrapContainer) return;

      var elements = this.elements,
        popup = elements.popup;

      if (!popup.is(":visible")) return;

      var win = elements.win,
        widthWindow = win.width(),
        heightWindow = win.height(),
        widthPopup = popup.width(),
        heightPopup = popup.height(),
        scrollTop = win.scrollTop(),
        margin = options.margin,
        coordinates = {};

      if (!options.relativeTarget) {
        var getCenterTop = function(){
          return (heightWindow - heightPopup) / 2;
        },

        getCenterLeft = function(){
          return (widthWindow - widthPopup) / 2;
        };

        coordinates.top = getCenterTop();

        switch (options.position) {
          case "left center":
            coordinates.left = margin;
            break;
          case "right center":
            coordinates.left = widthWindow - widthPopup - margin;
            break;
          case "center center":
            coordinates.left = getCenterLeft();
            break;
          case "center auto":
            var recalcTop = function(){
              if (coordinates.top < 0) {
                coordinates.top = margin + scrollTop;
              }
            };

            coordinates.top += scrollTop;
            coordinates.left = getCenterLeft();

            recalcTop();

            var diff = $(options.containment).height() - (coordinates.top + heightPopup);

            if (diff < 0) {
              coordinates.top -= diff * (-1) + margin;
            }

            recalcTop();

            break;
          default:
            alert("Not correctly defined value position");
            break;
        }
      } else {
        var toggle = elements.toggle,
          widthToggle = toggle.outerWidth(),
          heightToggle = toggle.outerHeight(),
          offsetTop = toggle.offset().top,
          offsetLeft = toggle.offset().left;

        var getCenterLeft = function(){
          return offsetLeft - (widthPopup - widthToggle) / 2;
        };

        switch (options.position) {
          case "top":
            coordinates.top = offsetTop - heightPopup - margin;
            coordinates.left = getCenterLeft();
            break;
          case "bottom":
            coordinates.top = offsetTop + heightToggle + margin;
            coordinates.left = getCenterLeft();
            break;
          default:
            alert("Not correctly defined value position");
            break;
        }
      }

      popup.css(coordinates);
    },

    renderArrow: function(dir){
      this.elements.popup.prepend(this.templates.arrow.replace("{dir}", dir));
    },

    renderContainer: function(){
      this.elements.popup.wrap(this.templates.container);
    }
  };

  Popup.prototype.settings = {
    headBox: ".js-popup-headbox",
    close: ".js-popup-close",
    loader: ".js-popup-loader",
    container: ".popup-container",
    containment: ".page",
    hash: null,

    wrapContainer: false,
    // false - relative to the window, true - to the element
    relativeTarget: false,
    // relativeTarget: false - "[left center | right center | center center]"
    // relativeTarget: true - "[top | bottom]"
    position: "center center",
    duration: 300,
    margin: 20,
    draggable: false,

    closeResizing: true, // close the popup when resize window
    closeScrolling: false, // close the popup when scroll window

    activeClass: "state--active",
    hiddenClass: "state--hidden",
    enabledClass: "popup-enabled",
    dragCursorClass: "cursor--move",
    noTransitionClass: "no--transition",

    containerCellClass: "popup-container__cell",

    onInit: function(){},
    onBeforeOpen: function(){},
    onAfterOpen: function(){},
    onBeforeClose: function(){},
    onAfterClose: function(){},
    onChange: function(){}
  };
})(jQuery);



/* -- Разнести -- */
jQuery(function(){
  var hiddenClass = "state--hidden";

  buildPeoplePopup(".js-friends-toggle","friends","right center",false);
  buildPeoplePopup(".js-subscribed-to-toggle",'subscribed_to','top',true);
  buildPeoplePopup(".js-subscribed-by-toggle",'subscribed_by','top',true);

  function buildPeoplePopup(activator,method,position,relativeTarget){
    var page = 0;
    var userId = $(activator).data('user-id');
    var template = $('#tmpl-popup-people-person');
    var container = null;
    var scroll  = null;
    var loading = false;
    var count   = 0;
    var total   = 0;
    var popup   = null;

    var loadMore = function(){
      loading = true;
      popup.toggleLoader(true);

      TastyAPI.request('user',method,userId,{
        data:{page:page},
        success:function(data){
          var $popupText = container.find('.popup__text');
          if(data.total == 0){
            $popupText.removeClass(hiddenClass);
            scroll.update();
            popup.update();
            return;
          }else{
            $popupText.addClass(hiddenClass);
          }
          var people = data.people.map(function(person){
            person.avatar = TastyUtils.prepareAvatar(person.username,person.userpic);
            container.find(".js-scroller-pane").append(template.render([person]));
          });
          count += people.length;
          total = data.total;
          page++;

          scroll.update();
          popup.update();
        },
        complete:function(){
          popup.toggleLoader(false);
          loading = false;
        }
      });
    };

    var onScroll = function(e){
      var pane = $(this),
        maxScrollTop = Math.max(pane.prop("scrollHeight") - pane.height(), 0),
        scrollTop = pane.scrollTop();

      if(scrollTop>maxScrollTop-50){
        if(count < total && !loading){
          loadMore();
        }
      }
    };

    popup = new Popup($(activator), {
      relativeTarget: relativeTarget,
      position: position,

      closeScrolling: true,

      onInit: function($popup){
        container = $popup;

        var $scroller = $popup.find(".js-scroller");
        scroll = $scroller.baron({
          scroller: ".js-scroller-pane",
          bar: ".js-scroller-bar",
          track: ".js-scroller-track",
          barOnCls: "scroller--tracked",
          pause: 0,
        });
        $scroller.trigger("sizeChange")
                 .trigger("sizeChange");
        $popup.find('.js-scroller-pane').scroll(onScroll);
      },

      onBeforeOpen: function($popup){
        if(page==0){
          loadMore();
        }
        //scroll.update(); // Иногда не срабатывает, показывается стандартный скролл
        $popup.find(".js-scroller")
              .trigger("sizeChange")
              .trigger("sizeChange");
      }
    });

    return popup;
  }

  var tagsPopup = new Popup($(".js-tags-toggle"), {
    relativeTarget: true,
    position: "top",

    closeScrolling: true,

    onInit: function(popup){
      var scroller = popup.find(".js-scroller");

      scroll = scroller.baron({
        scroller: ".js-scroller-pane",
        bar: ".js-scroller-bar",
        track: ".js-scroller-track",
        barOnCls: "scroller--tracked",
        pause: 0,
      });

      scroller.trigger("sizeChange")
               .trigger("sizeChange");
    },

    onBeforeOpen: function(popup){
      popup.find(".js-scroller")
           .trigger("sizeChange")
           .trigger("sizeChange");
    }
  });

  var settingsPopup = new Popup($(".js-settings-toggle"), {
    wrapContainer: true,
    closeResizing: false,
    duration: 200,

    onInit: function(popup){
      popup.find(".js-expander-toggle").expander();

      popup.find(".js-editable-field").each(function(){
        new EditableField(this, {
          onReact: function(e){
            if (e.which == 13) {
              /* -- Demonstration Save -- */
              settingsPopup.toggleLoader(true);
              $(e.target).trigger("blur");

              setTimeout(function(){
                settingsPopup.toggleLoader(false);
              }, 300);

              return false;
              /* -- end Demonstration Save -- */
            }
          }
        });
      });
    }
  });
});
