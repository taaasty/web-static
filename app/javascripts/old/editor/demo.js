document.addEventListener("DOMContentLoaded",function(){
  function g(id){
    var core = new TastyEditor.Core(document.getElementById(id));

    var bold = new TastyEditor.Button('bold',core);
    bold.allow = ['strong'];
    bold.replace = [['b','strong']];

    bold.onInit = function(){};
    bold.onClick = function(selection,core){
      core.focus();
      core.exec('bold');
    };
    bold.onUpdate = function(selection){};
    bold.getStatus = function(){
      return (this.core.query('bold') ? 'active':'inactive');
    };


    var italic = new TastyEditor.Button('italic',core);
    italic.allow = ['i'];
    italic.replace = [];

    italic.onClick = function(selection,core){
      core.focus();
      core.exec('italic');
    };
    italic.getStatus = function(){
      return (this.core.query('italic') ? 'active':'inactive');
    };


    var ui = new TastyEditor.UI(core,{
      onInit: function(ui){
        var doc = ui.core.doc;
        var holder = ui.core.holder;

        var toolbar = doc.createElement('div');
        toolbar.className = ui.core.formatClassName('toolbar');
        toolbar.style.position = "absolute";

        holder.insertBefore(toolbar, ui.core.buffer);

        ui.toolbar = toolbar;
      },
      onUpdate: function(ui,core){
        if(core.range == null){
          ui.toolbar.style.display = "none";
        }else{
          var rect = core.range.getBoundingClientRect();
          ui.toolbar.style.top = (rect.top + rect.height) + 'px';
          ui.toolbar.style.left = rect.left + 'px';
          ui.toolbar.style.display = "inline-block";
        }

        for(bid in ui.buttons){
          var button  = ui.buttons[bid];
          var classes = [];

          button.object.onUpdate(ui,core);
          button.object.getElement().className = button.object.getClassList().join(" ");
        }
      }
    });

    ui.addButton('Жирный',bold);
    ui.addButton('Курсив',italic);

  }

  g('edit-me');
  g('edit-me-iframe');

},true);
