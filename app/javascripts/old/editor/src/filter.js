TastyEditor.Filter = function(){};
TastyEditor.Filter.prototype = {
  doc: null,

  replace: [],
  allowed: ['p','br'],

  /**
   *
   */
  normalize: function(input){
    //wrap first level text nodes with P
    var nodes = input.ChildNodes;
    var paragraph = [];
    for(var node = input.firstChild; node; node = node.nextSibling){
      if(node.nodeName == 'P'
      || node.nextSibling == null
      ||(node.nodeName == 'BR' && node.nextSibling.nodeName == 'BR')){
      //end of paragraph
        if(paragraph.length == 0)
          continue;

        if(node.nextSibling == null)
          paragraph.push(node);

        if(node.nodeName == "BR" && node.nextSibling.nodeName == 'BR'){
          input.removeChild(node.nextSibling);
          input.removeChild(node);
          delete node.nextSibling;
          delete node;
        }

        var first = paragraph.shift();
        var wraper = first.ownerDocument.createElement('p');

        this._swap(first,wraper);
        wraper.appendChild(first);

        paragraph.forEach(function(n){
          input.removeChild(n);
          wraper.appendChild(n);
        })
        var paragraph = [];
      }else{
        paragraph.push(node);
      }
    }
  },

  /**
   * Filters input content
   * Node -> Node
   */
  sanitize: function(input){
    var fragment = /(<|&lt;)!--(End|Start)Fragment--(>|&gt;)/i;
    if(input.innerHTML && input.innerHTML.match(fragment)){
      input.innerHTML = input.innerHTML.replace(fragment,'');
    }

    var output;
    var nodes = input.childNodes;

    this.replace = this.replace.map(function(v){
      return [v[0].toUpperCase(),v[1].toUpperCase()];
    });
    this.allowed = this.allowed.map(function(v){
      return v.toUpperCase();
    })

    for(var i=0; i < nodes.length; i++){
      var node = nodes[i];

      this._replace(node);
      this._clean(node);
      this._cleanAttributes(node);
      this.sanitize(node);
    }
  },

  _replace: function(node){
    var tag = node.tagName;
    if(typeof tag == 'undefined'){
      return;
    }
    tag = tag.toUpperCase();

    this.replace.forEach(function(rule){
      var oldTag = rule[0];
      var newTag = rule[1];
      if(tag != oldTag){
        return;
      }
      var newNode = this._changeTag(newTag,node);
      this._swap(node,newNode);
    }.bind(this));
  },

  _cleanAttributes: function(node){
    if(typeof node.style == 'undefined')
      return;

    node.style=null;
    node.className=null;
    node.id=null;
  },

  _clean: function(node){
    var tag = node.tagName;
    if(typeof tag == 'undefined'){
      return;
    }
    tag = tag.toUpperCase();

    if(this.allowed.indexOf(tag) == -1){
      this._unwrap(node);
    }
  },

  /**
   * Change node tag name
   * String -> Node -> Node
   */
  _changeTag:function(tag,node){
    var newNode = node.ownerDocument.createElement(tag);
    //newNode.innerHTML = node.innerHTML;
    for(var i = 0; i < node.childNodes; i++ ){
      var buffer = node.childNodes[i];
      node.removeChild(buffer);
      newNode.appendChild(buffer);
    }
    return newNode;
  },

  /**
   * Unwrap
   */
  _unwrap: function(node){
    var parent = node.parentNode;
    for(var cNode = node.firstChild; cNode; cNode = cNode.nextSibling){
      try{
      parent.insertBefore(cNode,node);
      }catch(e){}
    }
    parent.removeChild(node);
  },

  /**
   * Replaces node A with a node B
   * Node -> Node -> undefined
   */
  _swap: function(a,b){
    a.parentNode.replaceChild(b,a);
  }
}
