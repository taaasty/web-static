//borrowed form wisyhat
'use strict';

TastyEditor.Executive = function(doc){this.doc = doc;};
TastyEditor.Executive.prototype = {
  doc: null,

  exec: function(command, ui, value) {
    var handler = this.commands[command];
    if (handler) {
      handler.bind(this)(value);
    } else {
      //try {
        this.doc.execCommand(command, ui, value);
      //} catch(e) { return null; }
    }

    //this.doc.activeElement.fire("field:change");
  },


  query: function(state) {
    var handler = this.queries[state];
    if (handler) {
      return handler.bind(this)();
    } else {
      //try {
        return this.doc.queryCommandState(state);
      //} catch(e) { return null; }
    }
  },

  getSelectedStyles: function() {
    throw "TODO: Needs adoptation";

    var styles = $H({});
    var editor = this;
    editor.styleSelectors.each(function(style){
      var node = editor.selection.getNode();
      styles.set(style.first(), Element.getStyle(node, style.last()));
    });
    return styles;
  }
};

TastyEditor.Executive.prototype.queries = {
  bold: function() {
    return this.doc.queryCommandState('bold');
  },

  underline: function() {
    return this.doc.queryCommandState('underline');
  },

  italic: function() {
    return this.doc.queryCommandState('italic');
  },

  indent: function() {
    var node = window.getSelection().getNode();
    return node.match("blockquote, blockquote *");
  },

  align: function() {
    var node = window.getSelection().getNode();
    return Element.getStyle(node, 'textAlign');
  },

  link: function() {
    var node = window.getSelection().getNode();
    if(typeof node.tagName == 'undefined'){
      return false;
    }else{
      return node ? node.tagName.toUpperCase() == 'A' : false;
    }
  },

  orderedList: function() {
    var element = window.getSelection().getNode();
    if (element) return element.match('*[contenteditable=""] ol, *[contenteditable=true] ol, *[contenteditable=""] ol *, *[contenteditable=true] ol *');
    return false;
  },
  unorderedList: function() {
    var element = window.getSelection().getNode();
    if (element) return element.match('*[contenteditable=""] ul, *[contenteditable=true] ul, *[contenteditable=""] ul *, *[contenteditable=true] ul *');
    return false;
  }
};

TastyEditor.Executive.prototype.commands = {
  bold: function() {
    this.doc.execCommand('bold', false, null);
  },

  underline: function() {
    this.doc.execCommand('underline', false, null);
  },

  italic: function() {
    this.doc.execCommand('italic', false, null);
  },

  strikethrough: function() {
    this.doc.execCommand('strikethrough', false, null);
  },

  indent: function() {
    throw "TODO: needs adopatation";
    // TODO: Should use feature detection
    if (Prototype.Browser.Gecko) {
      var selection, range, node, blockquote;

      selection = window.getSelection();
      range     = selection.getRangeAt(0);
      node      = selection.getNode();

      if (range.collapsed) {
        range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      blockquote = new Element('blockquote');
      range = selection.getRangeAt(0);
      range.surroundContents(blockquote);
    } else {
      this.doc.execCommand('indent', false, null);
    }
  },

  outdent: function() {
    this.doc.execCommand('outdent', false, null);
  },

  toggleIndentation: function() {
    if (this.indent()) {
      this.outdent();
    } else {
      this.indent();
    }
  },

  font: function(font) {
    this.doc.execCommand('fontname', false, font);
  },

  fontSize: function(fontSize) {
    this.doc.execCommand('fontsize', false, fontSize);
  },

  color: function(color) {
    this.doc.execCommand('forecolor', false, color);
  },

  backgroundColor: function(color) {
    if(Prototype.Browser.Gecko) {
      this.doc.execCommand('hilitecolor', false, color);
    } else {
      this.doc.execCommand('backcolor', false, color);
    }
  },

  align: function(alignment) {
    this.doc.execCommand('justify' + alignment);
  },

  link: function(url) {
    this.doc.execCommand('createLink', false, url);
  },

  unlink: function() {
    var node = window.getSelection().getNode();
    if (this.doc.queryCommandState('link'))
      window.getSelection().selectNode(node);

    this.doc.execCommand('unlink', false, null);
  },

  formatblock: function(element){
    this.doc.execCommand('formatblock', false, element);
  },

  toggleOrderedList: function() {
    var selection, node;

    selection = window.getSelection();
    node      = selection.getNode();

    if (this.orderedListSelected() && !node.match("ol li:last-child, ol li:last-child *")) {
      selection.selectNode(node.up("ol"));
    } else if (this.unorderedListSelected()) {
      // Toggle list type
      selection.selectNode(node.up("ul"));
    }

    this.doc.execCommand('insertorderedlist', false, null);
  },

  insertOrderedList: function() {
    this.toggleOrderedList();
  },

  toggleUnorderedList: function() {
    var selection, node;

    selection = window.getSelection();
    node      = selection.getNode();

    if (this.unorderedListSelected() && !node.match("ul li:last-child, ul li:last-child *")) {
      selection.selectNode(node.up("ul"));
    } else if (this.orderedListSelected()) {
      // Toggle list type
      selection.selectNode(node.up("ol"));
    }

    this.doc.execCommand('insertunorderedlist', false, null);
  },

  insertUnorderedList: function() {
    this.toggleUnorderedList();
  },

  insertImage: function(url) {
    this.doc.execCommand('insertImage', false, url);
  },

  insertHTML: function(html) {
    if(!this.doc.queryCommandSupported('insertHTML')){
      var range = window.document.selection.createRange();
      range.pasteHTML(html);
      range.collapse(false);
      range.select();
    } else {
      this.doc.execCommand('insertHTML', false, html);
    }
  }
};
