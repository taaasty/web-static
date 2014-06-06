'use strict';

TastyEditor.Core = function(element,options){this._init(element,options)};
TastyEditor.Core.prototype = {
  settings: null,

  doc: null,
  win: null,

  holder: null,
  buffer: null,
  debugBuffer: null,

  selection: null,
  range: null,

  savedRange: null,

  listeners: null,

  executive: null,

  _init: function(element,options){
    if(!(element instanceof Element)){
      throw new Error("Can not instantiate editor "
                     +"for object of type "+(typeof element));
    }
    this.settings = TastyEditor.Helper.merge({},this._defaults, options);

    this.listeners = {select:[], change:[]};

    //creating an editable buffer
    this._initBuffer(element)

    //creating buffer for debug output
    if(this.settings.debug){
      debugBuffer = document.createElement('div');
    }

    //attaching modification event handler
    ['input', 'keyup', 'keypress'].forEach(function(event){
      this.buffer.addEventListener(event, this._normalizeInput.bind(this));
    }.bind(this));

    //attaching selection change event handler
    ['keyup', 'mouseup'].forEach(function(event){
      this.buffer.addEventListener(event, this._normalizeSelect.bind(this));
    }.bind(this));

    this.buffer.addEventListener('paste', this._normalizeClipboard.bind(this));

    this.buffer.addEventListener('blur', this._saveState.bind(this));


    this.executive = new TastyEditor.Executive(this.doc);
    this.filter = new TastyEditor.Filter();
    this.filter.allowed = (this.settings.multiline ? ['br','p'] : []);

    var filtrate =  function(){
      this.filter.sanitize(this.buffer);
      if(this.settings.miltiline)
        this.filter.normalize(this.buffer);
    }.bind(this);
    this.addChangeListener(filtrate);
    filtrate();

  },

  _initBuffer: function(element){
    var buffer, holder;

    if(this.settings.iframe){
      var doc = document;
      buffer = doc.createElement('iframe');

      holder = doc.createElement('div')
      holder.className = this.formatClassName();
    }else{
      var doc = document;
      this.doc = document;

      holder = this.doc.createElement('div');
      holder.className = this.formatClassName();

      buffer = this.doc.createElement('div');
    }

    for(i = 0; i < element.attributes.length; i++){
        var src = element.attributes[i];
        var dst = doc.createAttribute(src.name);
        dst.value = src.value;
        holder.attributes.setNamedItem(dst);
    }

    buffer.className = this.formatClassName('content');
    buffer.innerHTML = element.innerHTML;

    // Recommended in section 8.6.3 of this document
    // http://www.whatwg.org/specs/web-apps/current-work/#contenteditable
    buffer.style.whiteSpace = 'pre-wrap';

    holder.appendChild(buffer);
    element.parentNode.replaceChild(holder,element);

    if(this.settings.iframe){
      this.doc = buffer.contentDocument;
      this.doc.body.contentEditable = true;
    } else {
      buffer.contentEditable = true;
    }

    this.buffer = buffer;
    this.holder = holder;
  },

  _normalizeClipboard: function(event){
    var content;

    if(event && event.clipboardData && event.clipboardData.getData){
      var types = [];
      for (i in event.clipboardData.types){
        types.push(event.clipboardData.types[i]);
      }

      if(/text\/html/.test(types)){
        content = event.clipboardData.getData('text/html');
        content = content.replace(/[\n\t\r]/g,'');

        // strip_tags for html (remove styles)
        content = content.replace(/<\/?[^>]+>/gi, '');
      }else if (/text\/plain/.test(types)){
        content = event.clipboardData.getData('text/plain');

        // htmlspecialchars for text
        content = content.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
      }else{
        content = "";
      }


      //content = content.replace(/(<|&lt;)!--(End|Start)Fragment--(>|&gt;)/i,'');
      //content = content.replace(new RegExp("(?:<|&lt;)!--(?:.|[\r\n])*--(?:>|&gt;)", 'gmi'), '');

      this.exec('insertHTML',content);

      if(event.preventDefault){
        event.stopPropagation();
        event.preventDefault();
      }
      return false;
    }else{

    }
  },

  _normalizeInput: function(event){
    switch(event.type){
      case 'keypress':
        if(this.settings.multiline && event.keyCode == 13){
          this.exec('formatblock','p');
        }
        break;
      default:
        this._normalizeSelect();
        this._onChange();
    }
  },

  _normalizeSelect: function(){
    var selection = this.doc.getSelection();

    if(selection.rangeCount > 0){
      var range = selection.getRangeAt(0);
      if(this.range == null || !this.range.equalRange(range)){
        this.selection = selection;
        this.range = range;
        this._onSelect();
      }
    }
  },

  _saveState: function(){
    if(this.range){
      var parent = this.range.startContainer.parentElement;
      while(parent){
        if(this.buffer.isEqualNode(parent)){
          console.log('saving range', this.range);
          this.savedRange = this.range.cloneRange();
          break;
        }
        parent = parent.parentNode;
      }
    }
  },

  _restoreState: function(){
    if(!this.savedRange){
      return;
    }

    var selection = this.doc.getSelection();

    this.range = this.savedRange;

    selection.removeAllRanges();
    selection.addRange(this.range);

    this.savedRange = null;
  },

  _onSelect: function(){
    this.listeners.select.forEach(function(handler){
      handler(this);
    }.bind(this));
  },

  _onChange: function(){
    this.listeners.change.forEach(function(handler){
      handler(this);
    }.bind(this));
  },

  /**
   * Generates classname according to predefied rules
   * Selector prefix can be set via settings.selector
   * String
   *   #formatClassName() -> 'tedit'
   * String -> String
   *   #formatClassName('button') -> 'tedit-button'
   * [String] -> String
   *   #formatClassName(['button','active']) -> 'tedit-button-active'
   */
  formatClassName: function(name){
    if(typeof name == 'undefined'){
      return this.settings.selector;
    }else if(name instanceof Array){
      return this.settings.selectorPrefix + name.join("-");
    }else{
      return this.settings.selectorPrefix + name;
    }
  },

  /**
   * Registers selection change event listener
   * Function -> undefined
   */
  addSelectionListener: function(listener){
    if(listener instanceof Function){
      this.listeners.select.push(listener);
    }else{
      throw new TypeError("Listener should be a function");
    }
  },

  /**
   * Registers content change event listener
   * Function -> undefined
   */
  addChangeListener: function(listener){
    if(listener instanceof Function){
      this.listeners.change.push(listener);
    }else{
      throw new TypeError("Listener should be a function");
    }
  },

  /**
   * Returns true if the content buffer is empty
   * bool
   */
  isEmpty: function(){
    // strip tags & check
    if(this.getContent().replace(/<\/?[^>]+>/gi, '').match(/^[\s|\<br\?\>]*$/) != null){
      return true;
    }else{
      return false;
    }
  },

  getContent: function(){
    return this.buffer.innerHTML;
  },

  setContent: function(content){
    this.buffer.innerHTML = content;
    this._onChange();
  },

  focus: function(){
    this.buffer.focus();
    this._restoreState();
  },

  /**
   * Executes document formating command
   * String -> undefined
   * String -> String -> undefined
   */
  exec: function(command,arg){
    var saved = this.buffer.innerHTML;

    //this._restoreState();
    this.executive.exec(command,false,arg);

    var changed = this.buffer.innerHTML;

    if(saved != changed){
      this._onChange();
    }
  },

  /**
   * Query document command state
   * String -> Bool
   */
  query: function(command){
    //this._restoreState();
    return this.executive.query(command);
  },

  _defaults: {
    iframe: false,
    multiline: true,
    debug: false,
    selector: 'tedit',
    selectorPrefix: 'tedit-'
  },
};

