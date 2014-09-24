###* @jsx React.DOM ###

window.MessagesPopup_ChooserDropdown = React.createClass

  propTypes:
    onCancel: React.PropTypes.func.isRequired
    onSubmit: React.PropTypes.func.isRequired

  componentDidMount: ->
    @refs.chooserInput.getDOMNode().focus()

  render: ->
   `<div className="messages__chooser-dropdown">
      <input ref="chooserInput"
             type="text"
             className="messages__chooser-input js-messages-chooser-input"
             onKeyDown={ this.handleKeyDown }
             onBlur={ this.props.onCancel } />
      <div className="messages__chooser-results js-messages-chooser-results" />
    </div>`

  handleKeyDown: (e) ->
    switch e.key
      when 'Escape'
        e.preventDefault()
        @props.onCancel()

      when 'Enter'
        e.preventDefault()
        if e.target.value isnt ''
          @props.onSubmit e.target.value





# <div class="messages__chooser-results js-messages-chooser-results"><div class="messages__chooser-result state--active">
#             <div class="messages__person" data-id="1">
#                 <div class="messages__person-avatar">


#             <span class="avatar avatar--fifth">
#                 <span class="avatar__text">A</span>
#             </span>


#                 </div>
#                 <div class="messages__person-name">azamiryu</div>
#             </div>
#         </div><div class="messages__chooser-result">
#             <div class="messages__person" data-id="2">
#                 <div class="messages__person-avatar">
                    
            
#             <span class="avatar avatar--fifth">
#                 <span class="avatar__text">A</span>
#             </span>
            
        
#                 </div>
#                 <div class="messages__person-name">ary</div>
#             </div>
#         </div><div class="messages__chooser-result">
#             <div class="messages__person" data-id="3">
#                 <div class="messages__person-avatar">
                    
            
#             <span class="avatar avatar--fifth">
#                 <span class="avatar__text">A</span>
#             </span>
            
        
#                 </div>
#                 <div class="messages__person-name">andre</div>
#             </div>
#         </div></div>



#   new Chooser($(".js-messages-chooser"), {
#     container: ".js-messages-chooser",
#     button: ".js-messages-chooser-button",
#     input: ".js-messages-chooser-input",
#     results: ".js-messages-chooser-results",
#     result: ".messages__chooser-result",

#     url: "api/messages/recipients.json",

#     events: {
#       ajaxError: function(error){
#         Tasty.notify("error", error.message);
#       },

#       prepareFormatResult: function(user){
#         var avatarHtml = Tasty.createAvatar(user.username, user.userpic);

#         var userHtml = $.render.messagePersonTmpl({
#           userid: user.id,
#           username: user.username,
#           avatar: avatarHtml
#         });

#         return userHtml;
#       },

#       selectResult: function(item){
#         var id = item.children().data("id");

#         console.log(id);
#       }
#     }
#   });


# /**
#  * Chooser
#  */
# (function($){
#   var defaults = {
#     container: ".chooser",
#     button: ".chooser__button",
#     input: ".chooser__input",
#     results: ".chooser__results",
#     result: ".chooser__result",

#     openClass: "state--open",
#     expandedClass: "state--expanded",
#     activeClass: "state--active",

#     url: null,
#     ajaxDelay: 400,
#     maxNumberResults: 8,

#     messages: {
#       empty: "По данному запросу ничего не найдено. Попробуйте поискать по-другому."
#     },

#     events: {
#       ajaxError: null,
#       prepareFormatResult: null,
#       selectResult: null
#     }
#   },

#   KEY = {
#     ENTER: 13,
#     ESC: 27,
#     UP: 38,
#     DOWN: 40
#   };

#   Chooser = function(container, options){
#     this.options = $.extend({}, defaults, options);

#     this.elements = {
#       container: $(container),
#       button: null,
#       input: null,
#       results: null
#     };

#     this.ajaxTimeout = null;
#     this.request = null;
#     this.currentResult = 0;

#     this._init();
#   };

#   Chooser.prototype = {
#     _init: function(){
#       var elements = this.elements,
#         options = this.options;

#       elements.button = elements.container.find(options.button);
#       elements.input = elements.container.find(options.input);
#       elements.results = elements.container.find(options.results);

#       this._events();
#     },

#     _events: function(){
#       var elements = this.elements,
#         options = this.options;

#       elements.results
#         .on("mousedown", function(e){
#           e.preventDefault();
#         })
#         .on("click", options.result, function(){
#           console.log($(this).index());
#         })
#         .on("mouseenter", options.result, function(e){
#           this.currentResult = $(e.target).index();
#           this._activateCurrentResult();
#         }.bind(this));

#       elements.button.on("click", function(){
#         this.open();
#       }. bind(this));

#       elements.input
#         .on("blur", function(e){
#           this.close();
#         }.bind(this))
#         .on("keydown", function(e){
#           this._keydown(e);
#         }.bind(this))
#         .on("paste input", function(e){
#           setTimeout(function(){
#             this._reedQuery(e.target.value);
#           }.bind(this), 0);
#         }.bind(this));

#       var container = elements.container;

#       $(document).on("mousedown", function(e){
#         var target = $(e.target);

#         if (!target.is(container) && !target.closest(options.container).is(container)) {
#           this.close();
#         }
#       }.bind(this));
#     },

#     _keydown: function(e){
#       var elements = this.elements,
#         options = this.options;

#       switch (e.which) {
#         case KEY.ESC:
#           this.close();
#           break;
#         case KEY.UP:
#           this._moveHighlight(-1);
#           break;
#         case KEY.DOWN:
#           this._moveHighlight(1);
#           break;
#         case KEY.ENTER:
#           this._selectResult(this.currentResult);
#           this.close();
#           break;
#         default:
#           setTimeout(function(){
#             this._reedQuery(e.target.value);
#           }.bind(this), 0);
#           break;
#       }
#     },

#     _reedQuery: function(query){
#       if (query != "" && this.options.url != null) {
#         if (this.prevQuery !== query) {
#           this._clearResults();
#           this._ajax(query);
#           this.prevQuery = query;
#         }
#       } else if (query == "") {
#         this._clear();
#       }
#     },

#     _ajax: function(query){
#       var elements = this.elements,
#         options = this.options;

#       if (this.ajaxTimeout) clearTimeout(this.ajaxTimeout);

#       if (this.request) this.request.abort();

#       this.ajaxTimeout = setTimeout(function(){
#         this.request = $.ajax({
#           url: options.url,
#           type: "GET",
#           data: {max: options.maxNumberResults, query: query},
#           dataType: "JSON",
#           success: function(data){
#             if (data && data.length > 0) {
#               this._renderResults(data);
#               this._openResults();
#               this.currentResult = 0;
#             } else {
#               elements.results.html("<p>" + options.messages.empty + "</p>");
#             }
#           }.bind(this),
#           error: function(error){
#             if ($.isFunction(options.events.ajaxError)) {
#               options.events.ajaxError(error);
#             }
#           }
#         });
#       }.bind(this), options.ajaxDelay);
#     },

#     _renderResults: function(data){
#       var elements = this.elements,
#         options = this.options;

#       if ($.isFunction(options.events.prepareFormatResult)) {
#         var resultsHtml = "";

#         $.each(data, function(){
#           var result = options.events.prepareFormatResult(this);

#           resultsHtml += "" +
#             "<div class=" + options.result.replace(".", "") + ">" + result + "</div>";
#         });

#         elements.results.html(resultsHtml);
#         elements.results.children().eq(0).addClass(options.activeClass);
#       }
#     },

#     _openResults: function(){
#       this.elements.container.addClass(this.options.expandedClass);
#     },

#     _closeResults: function(){
#       this.elements.container.removeClass(this.options.expandedClass);
#     },

#     _clearResults: function(){
#       this._closeResults();
#       this.elements.results.empty();
#     },

#     _selectResult: function(index){
#       var options = this.options;

#       if ($.isFunction(options.events.selectResult)) {
#         options.events.selectResult(this.elements.results.children().eq(index));
#       }
#     },

#     _moveHighlight: function(delta){
#       var lengthResults = this.elements.results.children().length;

#       if (lengthResults > 0) {
#         if ((this.currentResult > 0 && delta < 0) || (this.currentResult < lengthResults - 1 && delta > 0)) {
#           this.currentResult += delta;
#           this._activateCurrentResult();
#         }
#       }
#     },

#     _activateCurrentResult: function(){
#       var results = this.elements.results.children(),
#         activeClass = this.options.activeClass;

#       results.filter("." + activeClass).removeClass(activeClass);
#       results.eq(this.currentResult).addClass(activeClass);
#     },

#     _clear: function(){
#       var elements = this.elements;

#       elements.input.val("");
#       this._clearResults();
#       this.prevQuery = "";
#     },

#     open: function(){
#       var elements = this.elements,
#         options = this.options;

#       elements.container.addClass(options.openClass);
#       elements.input.focus();
#     },

#     close: function(){
#       var elements = this.elements,
#         options = this.options;

#       elements.container.removeClass(options.openClass);
#       this._clear();
#     }
#   };
# })(jQuery);
