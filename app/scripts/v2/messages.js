
/**
 * Chooser
 */
(function($){
  var defaults = {
    container: ".chooser",
    button: ".chooser__button",
    input: ".chooser__input",
    results: ".chooser__results",
    result: ".chooser__result",

    openClass: "state--open",
    expandedClass: "state--expanded",
    activeClass: "state--active",

    url: null,
    ajaxDelay: 400,
    maxNumberResults: 8,

    messages: {
      empty: "По данному запросу ничего не найдено. Попробуйте поискать по-другому."
    },

    events: {
      ajaxError: null,
      prepareFormatResult: null,
      selectResult: null
    }
  },

  KEY = {
    ENTER: 13,
    ESC: 27,
    UP: 38,
    DOWN: 40
  };

  Chooser = function(container, options){
    this.options = $.extend({}, defaults, options);

    this.elements = {
      container: $(container),
      button: null,
      input: null,
      results: null
    };

    this.ajaxTimeout = null;
    this.request = null;
    this.currentResult = 0;

    this._init();
  };

  Chooser.prototype = {
    _init: function(){
      var elements = this.elements,
        options = this.options;

      elements.button = elements.container.find(options.button);
      elements.input = elements.container.find(options.input);
      elements.results = elements.container.find(options.results);

      this._events();
    },

    _events: function(){
      var elements = this.elements,
        options = this.options;

      elements.results
        .on("mousedown", function(e){
          e.preventDefault();
        })
        .on("click", options.result, function(){
          console.log($(this).index());
        })
        .on("mouseenter", options.result, function(e){
          this.currentResult = $(e.target).index();
          this._activateCurrentResult();
        }.bind(this));

      elements.button.on("click", function(){
        this.open();
      }. bind(this));

      elements.input
        .on("blur", function(e){
          this.close();
        }.bind(this))
        .on("keydown", function(e){
          this._keydown(e);
        }.bind(this))
        .on("paste input", function(e){
          setTimeout(function(){
            this._reedQuery(e.target.value);
          }.bind(this), 0);
        }.bind(this));

      var container = elements.container;

      $(document).on("mousedown", function(e){
        var target = $(e.target);

        if (!target.is(container) && !target.closest(options.container).is(container)) {
          this.close();
        }
      }.bind(this));
    },

    _keydown: function(e){
      var elements = this.elements,
        options = this.options;

      switch (e.which) {
        case KEY.ESC:
          this.close();
          break;
        case KEY.UP:
          this._moveHighlight(-1);
          break;
        case KEY.DOWN:
          this._moveHighlight(1);
          break;
        case KEY.ENTER:
          this._selectResult(this.currentResult);
          this.close();
          break;
        default:
          setTimeout(function(){
            this._reedQuery(e.target.value);
          }.bind(this), 0);
          break;
      }
    },

    _reedQuery: function(query){
      if (query != "" && this.options.url != null) {
        if (this.prevQuery !== query) {
          this._clearResults();
          this._ajax(query);
          this.prevQuery = query;
        }
      } else if (query == "") {
        this._clear();
      }
    },

    _ajax: function(query){
      var elements = this.elements,
        options = this.options;

      if (this.ajaxTimeout) clearTimeout(this.ajaxTimeout);

      if (this.request) this.request.abort();

      this.ajaxTimeout = setTimeout(function(){
        this.request = $.ajax({
          url: options.url,
          type: "GET",
          data: {max: options.maxNumberResults, query: query},
          dataType: "JSON",
          success: function(data){
            if (data && data.length > 0) {
              this._renderResults(data);
              this._openResults();
              this.currentResult = 0;
            } else {
              elements.results.html("<p>" + options.messages.empty + "</p>");
            }
          }.bind(this),
          error: function(error){
            if ($.isFunction(options.events.ajaxError)) {
              options.events.ajaxError(error);
            }
          }
        });
      }.bind(this), options.ajaxDelay);
    },

    _renderResults: function(data){
      var elements = this.elements,
        options = this.options;

      if ($.isFunction(options.events.prepareFormatResult)) {
        var resultsHtml = "";

        $.each(data, function(){
          var result = options.events.prepareFormatResult(this);

          resultsHtml += "" +
            "<div class=" + options.result.replace(".", "") + ">" + result + "</div>";
        });

        elements.results.html(resultsHtml);
        elements.results.children().eq(0).addClass(options.activeClass);
      }
    },

    _openResults: function(){
      this.elements.container.addClass(this.options.expandedClass);
    },

    _closeResults: function(){
      this.elements.container.removeClass(this.options.expandedClass);
    },

    _clearResults: function(){
      this._closeResults();
      this.elements.results.empty();
    },

    _selectResult: function(index){
      var options = this.options;

      if ($.isFunction(options.events.selectResult)) {
        options.events.selectResult(this.elements.results.children().eq(index));
      }
    },

    _moveHighlight: function(delta){
      var lengthResults = this.elements.results.children().length;

      if (lengthResults > 0) {
        if ((this.currentResult > 0 && delta < 0) || (this.currentResult < lengthResults - 1 && delta > 0)) {
          this.currentResult += delta;
          this._activateCurrentResult();
        }
      }
    },

    _activateCurrentResult: function(){
      var results = this.elements.results.children(),
        activeClass = this.options.activeClass;

      results.filter("." + activeClass).removeClass(activeClass);
      results.eq(this.currentResult).addClass(activeClass);
    },

    _clear: function(){
      var elements = this.elements;

      elements.input.val("");
      this._clearResults();
      this.prevQuery = "";
    },

    open: function(){
      var elements = this.elements,
        options = this.options;

      elements.container.addClass(options.openClass);
      elements.input.focus();
    },

    close: function(){
      var elements = this.elements,
        options = this.options;

      elements.container.removeClass(options.openClass);
      this._clear();
    }
  };
})(jQuery);

$(function(){
  $.templates("messagePersonTmpl", "#tmpl-message-person");

  new Chooser($(".js-messages-chooser"), {
    container: ".js-messages-chooser",
    button: ".js-messages-chooser-button",
    input: ".js-messages-chooser-input",
    results: ".js-messages-chooser-results",
    result: ".messages__chooser-result",

    url: "http://my/mmm-tasty/public/newstatic/api/messages/recipients.json",

    events: {
      ajaxError: function(error){
        TastyUtils.notify("error", error.message);
      },

      prepareFormatResult: function(user){
        var avatarHtml = TastyUtils.createAvatar(user.username, user.userpic);

        var userHtml = $.render.messagePersonTmpl({
          userid: user.id,
          username: user.username,
          avatar: avatarHtml
        });

        return userHtml;
      },

      selectResult: function(item){
        var id = item.children().data("id");

        console.log(id);
      }
    }
  });
});




/* -- Полностью перепилка -- */
(function($){
  var defaults = {
    messages: ".js-messages",
    back: ".js-messages-back",
    section: ".js-messages-section",
    dialogs: ".js-messages-dialogs",
    dialog: ".js-messages-dialog",
    add: ".js-messages-add",

    readClass: "state--read",

    dialogsUrl: "http://my/mmm-tasty/public/newstatic/api/messages/dialogs.json",

    templates: {
      dialog: "#tmpl-message-dialog"
    },

    events: {
      ajaxBeforeSend: null,
      openSection: null
    }
  };

  Messages = function(options){
    if (options) $.extend(this.settings, options); // old
    if (options) this.options = $.extend(defaults, options);

    this.elements = {
      messages: null,
      back: null,
      section: null,
      dialog: null,
      add: null
    };

    this.templates = {
      dialog: null
    };

    this.path = [];
    this.titles = {};

    this._init();
  };

  Messages.prototype = {
    // Elements
    $messages: null,
    $back: null,
    $section: null,
    $dialog: null,
    $add: null,

    _init: function(){
      var options = this.settings,
        _options = this.options,
        elements = this.elements,
        templates = this.templates;

      elements.messages = $(_options.messages);
      elements.back = elements.messages.find(_options.back);
      elements.dialogs = elements.messages.find(_options.dialogs);

      templates.dialog = $(_options.templates.dialog);

      this._clearDialogs();
      this._getDialogs();

        this.$messages = $(options.messages);
        this.$back = this.$messages.find(options.back);
        this.$section = this.$messages.find(options.section);
        this.$dialog = this.$messages.find(options.dialog);
        this.$add = this.$messages.find(options.add);

        this.titles.dialogs = this.$section.filter("[data-section=dialogs]").data("title");
        this.titles.recipients = this.$section.filter("[data-section=recipients]").data("title");

        this.displayBack();

        this._initEvents();


        $(".messages__field .form-field input").on("focus", function(){
          $(".messages__dropdown").show();
          $(".messages__dropdown-input").trigger("focus");
        });

        $(".messages__dropdown-input").on("keydown", function(){
          var input = this;

          setTimeout(function(){
            if (input.value != "") {
              $(".messages__results").show();
            } else {
              $(".messages__results").hide();
            }
          }, 0)
        })
var self = this;
        $(".messages__results-item").on("click", function(){
          self.displayBack();
          self.openSection("empty");
        });

        $(".messages__dropdown-input").on("blur", function(){
          //$(".messages__dropdown").hide();
          //$(".messages__results").hide();
          this.value = "";
        })

        $(".message-form__textarea").on("keypress", function(e){
          if (e.which == 13 && this.value.replace(/\s/g) != "") {
            var vvv = this.value.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
            vvv = vvv.replace(/(http\S+)/gi, "<a href=\"$1\" title=\"$1\" target=\"_blank\">$1</a>")
            $(".js-messages-list").append($("#tmpl-message-from").render({
              text: vvv
            }))

            $(this).val("");
            //this.value = this.value.replace(/\s/g)
            this.blur();
            e.preventDefault();
          }
        })


    },

    //@ NEW @//

    /**
     * Чистим блок от последних диалогов пользователя
     */
    _clearDialogs: function(){
      this.elements.dialogs.empty();
    },

    /**
     * Аяксом вытягиваем все последние диалоги пользователя
     * Если всё прошло нормально, то отрисовываем их.
     * Иначе - уведомляем об ошибке.
     */
    _getDialogs: function(){
      var options = this.options;

      $.ajax({
        url: options.dialogsUrl,
        beforeSend: function(){
          if (options.events.ajaxBeforeSend) {
            options.events.ajaxBeforeSend();
          }
        },
        success: function(data){
          if (data && data.length > 0) {
            if (options.events.ajaxSuccess) {
              options.events.ajaxSuccess();
            }

            this._renderDialogs(data);
          }
        }.bind(this),
        error: function(error){
          TastyUtils.notify("error", error.message);
        }
      })
    },

    _renderDialogs: function(dialogs){
      var elements = this.elements,
        options = this.options,
        templates = this.templates;
        dialogsHtml = "";

      $.each(dialogs, function(){
        var dialogHtml = templates.dialog.render({
          id: this.id,
          reed: ((!this.last_message.reed) ? "" : " " + options.readClass),
          avatar: TastyUtils.createAvatar(this.user.name, this.user.pic),
          online: this.user.online,
          username: this.user.name,
          textMessage: this.last_message.text,
          createdAt: this.last_message.created_at,
          numberNewMessages: this.number_new_messages,
        });

        dialogsHtml += dialogHtml;
      });

      elements.dialogs.html(dialogsHtml);
    },

    //@ OLD @//
    _initEvents: function(){
      var self = this;

      this.$add.on("click", function(){
        self.path.push("dialogs");
        self.displayBack();
        self.openSection("recipients");
      })

      this.$dialog.on("click", function(){
        self.path.push("dialogs");
        self.displayBack();
        self.openSection("thread");
      });

      this.$back.on("click", function(){
        if (self.path.length > 0) {
          var last = self.path.pop();
          self.displayBack();
          self.openSection(last);
        }
      });
    },

    openSection: function(section){
      this.$section.filter(function(){
        $(this)[($(this).is("[data-section=" + section + "]")) ? "slideDown" : "slideUp"](300);
      });

      if ($.isFunction(this.settings.onOpenSection)) {
        this.settings.onOpenSection({
          section: section,
          titles: this.titles
        });
      }
    },

    displayBack: function(){
      this.$back[(this.path.length > 0) ? "removeClass" : "addClass"]("state--hidden");
    }
  };

  Messages.prototype.settings = {
    messages: ".js-messages",
    back: ".js-messages-back",
    section: ".js-messages-section",
    dialog: ".js-messages-dialog",
    add: ".js-messages-add",

    onOpenSection: function(){}
  };
})(jQuery);


jQuery(function(){
  var initedSelectRecipients = false;
  var scroll = null;
  var popup = new Popup($(".js-messages-toggle"), {
    position: "center auto",
    draggable: true,
    closeResizing: false,

    onInit: function($popup){
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
    },

    onBeforeOpen: function($popup){
      $popup.find(".js-scroller")
            .trigger("sizeChange")
            .trigger("sizeChange");
    }
  });

  if(popup.elements.popup == null){
   console.log('нет popup.elements.popup');
    return;
  }

  var popupTitle = popup.elements.popup.find(".popup__title"),
  popupHeadbox = popup.elements.popup.find(".popup__headbox");
  popup.show();
  var messages = new Messages({
    onOpenSection: function(e){
      switch (e.section) {
        case "dialogs":
          popupTitle.text(e.titles.dialogs);
          popupHeadbox.slideDown(300);
          break;
        case "thread":
          popupTitle.text(e.titles.dialogs);
          popupHeadbox.slideUp(300);

          break;
        case "recipients":
          popupTitle.text(e.titles.recipients);
          popupHeadbox.slideDown(300);
          break;
      }

      popup.elements.popup.find(".js-scroller")
            .trigger("sizeChange")
            .trigger("sizeChange");
    },

    // NEW
    events: {
      ajaxBeforeSend: function(){
        popup.toggleLoader(true);
      },

      ajaxSuccess: function(){
        popup.toggleLoader(false);
      }
    }
  });
});
/* -- end Полностью перепилка -- */
