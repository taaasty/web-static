(function($){
  Design = function(options,values){
    if (options)
      this.settings = $.extend({}, this.settings, options);
    if (values)
      this.values = $.extend({}, this._defaultValues, values);

    this._init();
  };

  Design.prototype = {
    values: {},

    _defaultValues: {
      coverImage: '',    // string url
      coverAlign: 'justify', // string center|justify
      feedColor: 'white',// string white|black
      feedOpacity: '1',  // float  [0..1]
      fontType: 'sans'   // string sans|sans-serif
    },

    _controls: {
      layout:      {type: 'radio', options: ['tlog','cover','sidebar']},
      coverImage:  {type: 'file'},
      coverAlign:  {type: 'radio', options: ['center','justify','repeat']},
      headerColor: {type: 'radio', options: ['white','black','whiteonblack','blackonwhite', 'auto']},
      feedColor:   {type: 'radio', options: ['white','black']},
      feedOpacity: {type: 'opacity'},
      fontType:    {type: 'radio', options: ['sans','serif']},
    },

    window: null,
    body: null,
    pagePreview: null, // Элемент предпросмотра наших настроек
    feedBg: null, // Блок цвета ленты тлога
    rangeOpacity: null, // Слайдер прозрачности ленты тлога
    loader: null,
    coverPixel: null,

    settingsDesign: null, // Экземпляр попапа настроек дизайна
    saveTimeout: null,
    saveUser: false, //save was initiated by user

    _firstShowSettingsDesign: false,

    _init: function(){

      var opts = this.settings;

      this.window = $(window);
      this.body = $("body");

      var $userbar = $(".js-userbar");

      var self = this;
      function createPopup(){
        return new Popup($(".js-settings-design-toggle"), {
          startHidden: true,
          draggable: true,
          position:  "left center",
          hash:      "#popup-design",
          onBeforeOpen: function(){
            $userbar.addClass(this.activeClass);
          },
          onBeforeClose: function(){
            $userbar.removeClass(this.activeClass);
          },
          onChange: function(e){
            self.changeSettings(e);
          }.bind(this)
        });
      }

      var saw_guide = false;
      if($('.js-guide-design-popup').length>0){
        $(".js-settings-design-toggle").click(function(){
          if(saw_guide)
            return;

          new GuidePopup({popup: '.js-guide-design-popup'});
          $('.js-guide-design-popup').removeClass('state--hidden');
          $('.js-guide-popup-next').click(function(){
              console.log(this);
              if($(this).hasClass('state--active')){
                if(!$(this).hasClass('state--finish')){
                  $(this).addClass('state--finish');
                  return;
                }
              } else {
                return;
              }

              var dsp = createPopup();
              dsp.toggleLoader(false);

              saw_guide = true;
              $(".js-settings-design-toggle").click();

              TastyAPI.request('user','save',{
                data:{saw_guide_design: 1}
              });
          });
        }.bind(this));
      }else{
        var dsp = createPopup();
        dsp.toggleLoader(false);
      }

      this.settingsDesign =  dsp;

      this.pagePreview = $(opts.pagePreview);
      this.feedBg = $(opts.feedBg);
      this.rangeOpacity = $(opts.formRangeOpacity);
      this.coverPixel = $(opts.coverPixel);
      this.loader = $(opts.loader);

      new FileReceiver({ // инициализируем загрузку ковера в настройках дизайна
        hoverClass: "state--drag-hover",
        cover: ".js-cover",
        dropables: [".js-drop-cover"],
        inputs: [".js-upload-cover-input"],
        onReady: function(file){
          this.setValue('layout-cover',file);
        }.bind(this),
        onReaderLoad: function(url) {
          this.coverPixel.css('background-image', 'url(' + url + ')');
        }.bind(this)
      });

      this.initRangeOpacity(); // инициализируем слайдер прозрачности
      $(opts.formRadiogroup).formRadio(); // инициализируем радиобаттоны

      this._initEvents();
      this.load();
    },

    _initEvents: function(){
      //this.settingsDesign.$popup.on("change", this.changeSettings.bind(this));

      this.window.on("resize", this.resize.bind(this));
    },

    resize : function(){},

    setValue: function(name, value){
      this.settings.onChange(name,value);

      if(name == 'layout-cover'){
        this.sendCover(value);
        return;
      }

      if(typeof this._controls[name] == 'undefined'){
        throw 'Can\'t find control \"'+name+'"';
      }

      var control = this._controls[name];
      var prefix = 'tlog-'+name.toLowerCase()+'-';

      switch(control.type){
        case 'radio':
          if(control.options.indexOf(value) == -1){
            throw 'Invalid value "'+value+'" for "'+name+'"';
          }
          classes = control.options.map(function(value){return prefix+value}).join(' ');
          this.body.removeClass(classes).addClass(prefix+value);
          this.values[name] = value;
          break;
        case 'file':
          break;
        case 'opacity':
          o = parseInt(value, 10);
          o = ( o >= 0 && o <= 99 ) ? o / 100 : 1;
          this.feedBg.css({opacity: o });
          this.values[name] = o;
          break;
      }
    },

    changeSettings: function(e){
      var id = $(e.target).attr("id"),
        name = $(e.target).attr("name"),
        params = this._params;
      var value = $(e.target).val();

      this.addClasses = "", this.removeClasses = "";

      this.setValue(name,value);

      this.save();
    },

    load: function(){
      var values = {};
      //loading booleans
      this.body.attr('class').split(/\s+/).map(function(cl){
        var parts = cl.match(/tlog-(\w+)-(\w+)/i);
        if(parts == null)
          return;
        var key = parts[1];
        var val = parts[2];

        values[key] = val;

        $('#tlog-'+key+'-'+val).prop('checked',true).change();
      });

      //loading opacity
      var opacity = this.feedBg.css('opacity');
      this.rangeOpacity.val(opacity);
      this.rangeOpacity.slider('value', opacity*100);

      //loading background
      //..
      this.values = values;
    },

    save: function(){
      if(this.saveTimeout != null){
        return;
      }
      var delay = this.settings.saveDelay;
      this.saveTimeout = setTimeout(function(){
        this.saveTimeout = null;
        console.log(this.saveUser);
        if(!this.saveUser){
          this.saveUser = true;
          return;
        }
        this.settingsDesign.toggleLoader(true);
        TastyAPI.request('user','save',{
          data:{design: JSON.stringify(this.values)},
          error: this.saveError,
          complete: function(){
            this.settingsDesign.toggleLoader(false);
          }.bind(this),
          success: function(){
            Tasty.notify('success','Настройки сохранены',2000);
            this.settings.onSave(this.values);
          }.bind(this)
        });
      }.bind(this),delay);
    },

    sendCover: function(file){
      this.settingsDesign.toggleLoader(true);

      TastyAPI.request('user','save',{
        data:{cover: file},
        complete: function(){
          this.settingsDesign.toggleLoader(false);
        }.bind(this),
        error: this.saveError,
        success: function(){
          Tasty.notify('success','Настройки сохранены',2000);
        }.bind(this)
      });
    },


    saveError: function(error){
      Tasty.notify('error', error.message);
    },

    toggleLoader: function(value){
      this.loader.toggleClass("state--hidden", !value);
    },

    initRangeOpacity: function(){
      var opts = this.settings;
      var rangeOpacity = this.rangeOpacity;
      var display = rangeOpacity.parent().find(opts.formRangeValue);

      var setInputValue = function(element, value){
        element.getElementsByTagName("input")[0].value = value;
      };

      var config = {
        min : 0,
        max : 100,
        step : 1,
        range : "min",
        value : 50,
        animate : false,
        orientation : "horizontal",
        change : function(event, ui){
          setInputValue(this, ui.value);
          display.text(ui.value + "%");
        },
        create : function(event, ui){
          var val = this.getElementsByTagName("input")[0].value;

          $(this).slider("option", "value", val);
          display.text(val + "%");
        },
        slide : function(event, ui){
          setInputValue(this, ui.value);
          $(this).find("input").trigger("change");
          display.text(ui.value + "%");
        }
      };

      this.rangeOpacity.slider(config);
    }
  };

  // Основные установки
  Design.prototype.settings = {
    settingsDesign: ".js-settings-design",
    pagePreview: ".js-preview-design",
    feedBg: ".js-page-body-bg",
    cover: ".js-cover",
    coverPixel: ".js-cover-pixel",
    formRadiogroup: ".js-form-radiogroup",
    formRangeOpacity: ".js-form-range-opacity",
    formRangeValue: ".js-form-range-value",
    loader: ".js-settings-design .spinner",

    saveDelay: 1000,
    onSave: function(){},
    onChange: function(key,value){},
  };
})(jQuery);
