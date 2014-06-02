'use strict';

TastyEditor.Button = function(name,core,ui){
  this.name = name;
  this.core = core;
  this.ui = ui;
};
TastyEditor.Button.prototype = {
  core: null,

  name: null,
  status: 'active',

  allow: [],
  replace: [],

  // Public methods
  setElement: function(element){
    if(this.getElement()){
      this._unbindEvents();
    }
    this._element = element;
    this._bindEvents();
  },

  getElement: function(){
    return this._element;
  },

  getClassList: function(){
    return [this.core.formatClassName('button'),
            this.core.formatClassName(['button',this.name]),
            this.core.formatClassName(['button',this.getStatus()])];
  },

  getStatus: function(status){
    return this.status;
  },


  // Button Event handler stubs
  onInit:    function(ui, core){},
  onClick:   function(ui, core){},
  onUpdate:  function(ui, core){},
  constrain: function(){return true;},

  _element: null,

  // Private methods
  _bindEvents: function(){
    this.getElement().addEventListener('click',this._dispatch.bind(this));
  },

  _unbindEvents: function(){
    this.getElement().removeEventListener('click',this._dispatch.bind(this));
  },

  _dispatch: function(event){
    event.preventDefault();
    var callback = this.onClick.bind(this);

    callback(this.ui,this.core);
  },

};
