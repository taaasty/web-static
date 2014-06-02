//Partially borrowed from wisyhat
//= require "./ierange"
//= require "./range"
'use strict';

if(typeof Selection == 'undefined'){
  var Selection = {};
  Selection.prototype = window.getSelection().__proto__;
}

Selection.prototype.getNode = function(){
  if (this.rangeCount > 0) {
    return this.getRangeAt(0).getNode();
  }else{
    return null;
  }
};

Selection.prototype.selectNode = function(element){
  var range = document.createRange();
  range.selectNode(element);
  this.removeAllRanges();
  this.addRange(range);
};

Selection.prototype.getAllRanges = function(){
  var ranges = [];
  for(var i = 0; i < this.rangeCount; i++){
    ranges.push(this.getRangeAt(i));
  }
  return ranges;
};

Selection.prototype.equalTo = function(selection){
  console.log(this.rangeCount, selection.rangeCount);
  if(this.rangeCount != selection.rangeCount)
    return false;

  var a = this.getAllRanges();
  var b = selection.getAllRanges();

//  console.log(a,b);
  for(var i = 0; i < this.rangeCount; i++){
    if(!a[i].equalRange(b[i])){
//      console.log('diff');
      return false;
    }
  }

  return true;
}
