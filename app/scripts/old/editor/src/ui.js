'use strict';

TastyEditor.UI = function(core,settings){this._init(core,settings);};
TastyEditor.UI.prototype = {
  settings: null,
  core: null,
  buttons: {},
  toolbar: null,

  _init: function(core, settings){
    this.core = core;
    this.settings = TastyEditor.Helper.merge({}, this._defaults, settings);

    this.core.addSelectionListener(
      function(){this.settings.onUpdate(this,this.core)}.bind(this));
    this.core.addChangeListener(
      function(){this.settings.onChange(this,this.core)}.bind(this));

    this.settings.onInit(this);
  },

  addButton: function(title, object){
    name = object.name;

    this.buttons[name] = {title: title, object:object};

    this.settings.onAdd(this, this.core, title, object);

    var filter=this.core.filter;
    filter.replace=filter.replace.concat(object.replace);
    filter.allowed=filter.allowed.concat(object.allow);

    object.onInit.bind(this)(this, this.core);
  },

  _defaults: {
    onInit:    function(ui,core){},
    onUpdate:  function(ui,core){},
    onChange:  function(ui,core){},
    onFocus:   function(ui,core){},
    onBlur:    function(ui,core){},
    onDestroy: function(ui,core){},
    onAdd:     function(ui,core,title,object){
      var element = core.doc.createElement('div');

      element.innerHTML = title;
      element.className = object.getClassList().join(" ");
      ui.toolbar.appendChild(element);
      object.setElement(element);
    }
  },
};

