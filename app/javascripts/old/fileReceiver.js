(function($){
    var defaults = {
        hoverClass: "_hover",
        onStart: function(){},
        onProgress: function(){},
        onSuccess: function(){},
        onReady: function(){},
        onReaderLoad: function(){},
        dropables: null, // Areas where user can drop files
        inputs: null, // <input type=file> elements
    };

  FileReceiver = function(options) {
      this.url = null;
      this.dragging = 0;
      this.tests = {
          fileReader: typeof FileReader != "undefined",
              dnd: "draggable" in document.createElement("span"),
              formData: !!window.FormData,
              progress: "upload" in new XMLHttpRequest
      };

      this.settings = $.extend({}, defaults, options);

      this.errors = [];

      this.accept = ["image/png","image/jpeg","image/gif"];

      this.init();
  };

  FileReceiver.prototype = {
    init: function(options){
      this._initEvents();
    },

    _initEvents: function(){
      var opts = this.settings;
      var tests = this.tests;

      if (tests.fileReader || tests.dnd) {
        this.settings.dropables.forEach(function(dropable){
          $(dropable)
            .on("dragenter", this.dragenter.bind(this))
            .on("dragleave", this.dragleave.bind(this))
            .on("dragover", this.noPropagation)
            .on("dragend", this.noPropagation)
            .on("drop", this.drop.bind(this));
        }.bind(this));

        this.settings.inputs.forEach(function(input){
          $(input).on("change", this.changeInput.bind(this));
        }.bind(this));
      }

    },

    _error: function(msg){
      this.errors.push(msg);
    },

    noPropagation: function(e) {
      e.stopPropagation();

      if (e.preventDefault) {
        return e.preventDefault();
      }else{
        return e.returnValue = false;
      }
    },

    dragenter: function(event){
      this.dragging++;
      var target = event.currentTarget;
      $(target).addClass(this.settings.hoverClass);
    },

    dragleave: function(event){
      this.dragging--;
      var target = event.currentTarget;
      if (this.dragging == 0) {
        $(target).removeClass(this.settings.hoverClass);
      };
    },

    drop: function(event){
      this.dragging = 0;

      event.preventDefault();

      var target = event.currentTarget;
      $(target).removeClass(this.settings.hoverClass);

      var files = event.originalEvent.dataTransfer.files;
      if(files.length > 0){
        this.readFile( files[0]);
      }
    },

    changeInput: function(event){
      var files = event.target.files;

      if(files.length > 0){
        this.readFile( files[0]);
      }
    },

    readFile: function(file){
      var $cover = $(this.settings.cover);
      var tests = this.tests;
      var formData = tests.formData ? new FormData() : null;

      if(this.accept.indexOf(file.type) == -1){
      //if (file.type.indexOf("image") == -1) { Можем организовать для всех картинок - bmp и т.д.
        this._error("загрузить можно только изображения");
      }else{
        if (tests.formData) formData.append("file", file);

        var reader = new FileReader();
        this.settings.onStart();

        reader.onload = function(e){
          var url = e.target.result;

          $cover.css("background-image", "url(" + url + ")");
          $cover.data("file", file);

          this.settings.onReaderLoad(url);
        }.bind(this);

        reader.readAsDataURL(file);
        this.settings.onReady(file);
      }

    },

    toggleInput: function(input,state){
      this.coverInput.forEach(function(input){
        if(state){
          $(input).removeAttr("disabled");
        }else{
          $(input).attr("disabled", "disabled");
        }
      });
    }
  };


})(jQuery);
