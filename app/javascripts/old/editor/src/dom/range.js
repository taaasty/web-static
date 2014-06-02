//Borrowed from wisyhat
//= require "./ierange"
'use strict';

Range.prototype.beforeRange = function (range) {
  if (!range || !range.compareBoundaryPoints) return false;
  return (this.compareBoundaryPoints(this.START_TO_START, range) == -1 &&
    this.compareBoundaryPoints(this.START_TO_END, range) == -1 &&
    this.compareBoundaryPoints(this.END_TO_END, range) == -1 &&
    this.compareBoundaryPoints(this.END_TO_START, range) == -1);
}

Range.prototype.afterRange = function (range) {
  if (!range || !range.compareBoundaryPoints) return false;
  return (this.compareBoundaryPoints(this.START_TO_START, range) == 1 &&
    this.compareBoundaryPoints(this.START_TO_END, range) == 1 &&
    this.compareBoundaryPoints(this.END_TO_END, range) == 1 &&
    this.compareBoundaryPoints(this.END_TO_START, range) == 1);
}

Range.prototype.betweenRange = function(range) {
  if (!range || !range.compareBoundaryPoints) return false;
  return !(this.beforeRange(range) || this.afterRange(range));
}

Range.prototype.equalRange = function(range) {
  if (!range || !range.compareBoundaryPoints) return false;
  return (this.compareBoundaryPoints(this.START_TO_START, range) == 0 &&
    this.compareBoundaryPoints(this.START_TO_END, range) == 1 &&
    this.compareBoundaryPoints(this.END_TO_END, range) == 0 &&
    this.compareBoundaryPoints(this.END_TO_START, range) == -1);
}

Range.prototype.getNode = function() {
  var parent = this.commonAncestorContainer;

  while (parent.nodeType == Node.TEXT_NODE)
    parent = parent.parentNode;

/*  var child = parent.childElements().detect(function(child) {
    var range = document.createRange();
    range.selectNodeContents(child);
    return this.betweenRange(range);
  }.bind(this)).shift();*/

  for (var i = 0; i < parent.childNodes.length; ++i) {
    var child = parent.childNodes[i];
    var range = document.createRange();
    range.selectNodeContents(child);
    if(this.betweenRange(range)){
      return child;
    }
  }

  return parent;
}

