'use strict';

TastyEditor.Helper = {
  merge: function (){
    // Resulting object
    var result = {};
    // Making a real array out of `arguments` array-like obj
    var args = Array.prototype.slice.apply(arguments);

    // Collecting properties
    args.forEach(function(arg){
      if (!(arg instanceof Object))
        return;
      for (var key in arg)
        result[key] = arg[key];
    });

    return result;
  }

}
