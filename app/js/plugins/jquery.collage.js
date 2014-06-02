;(function ($, window, document, undefined) {
  var pluginName = "collage",
    defaults = {
      item: ".collage__item",
      img: ".collage__item-img",

      lastClass: "is--last",
      prefix: "collage--",

      margin: 4,
      preload: true
    };

  var FIRST_ROW_RATIO = 2.5,
    NEXT_ROWS_RATIO = 4;

  function Plugin(container, options){
    this.options = $.extend({}, defaults, options);
    this.elements = {
      collage: $(container),
      item: null,
      img: null
    };
    this.data = {};

    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function(){
      var self = this,
      options = self.options,
      elements = self.elements;

      elements.item = elements.collage.find(options.item);
      elements.img = elements.collage.find(options.img);

      if (elements.item.length == 0) return;

      self.cleanup();

      if (options.preload) {
        self.preload(function(e){
          self.create(e.imgs);
        });
      } else {
        self.create(elements.img);
      }
    },

    preload: function(fn){
      var self = this,
        elements = self.elements,
        count = elements.item.length,
        loaded = 0;

      elements.img.one("load error", function(e){
        if (e.type == "error") {
          count--;
          $.data(this, "error", true)
        } else {
          loaded++;
        }

        if (loaded >= count) {
          var imgs = elements.img.filter(function(){
            if (!$.data(this, "error")) {
              return this;
            }
          });

          fn({imgs: imgs});
        }
      }).each(function(){
        this.src = this.src; // Убрал, потому что это лопает картинки из blob: + "?" + Date.now();
      });
    },

    create: function(imgs){
      var self = this,
        options = self.options,
        elements = self.elements,
        margin = options.margin,
        lastClass = options.lastClass;

      elements.collage.width(elements.collage.width());
      elements.item.show();

      self.data.imgs = buildImgsData(imgs, elements.collage.width(), margin, lastClass);

      self.data.type = self.data.imgs.type;

      if (typeof self.data.type != "undefined") {
        elements.collage.addClass(options.prefix + self.data.type);
      }

      for (var i = 0, countImgs = self.data.imgs.length; i < countImgs; i++) {
        var img = self.data.imgs[i],
          css = {
            width: img._width,
            height: img._height
          };

        imgs.eq(i).css(css);
        imgs.eq(i).closest(options.item).addClass(img.mod).css(css);
      }

      elements.item.hide();
      imgs.closest(options.item).fadeIn(300);
    },

    cleanup: function(){
      var self = this,
        options = self.options,
        elements = self.elements;

      self.data = {};

      elements.collage.removeAttr("style").removeClass(options.prefix + self.data.type);
      elements.item.removeAttr("style").removeClass(self.options.lastClass);
      elements.img.removeAttr("style");
    },

    update: function(){
      var self = this,
        options = self.options,
        elements = self.elements;

      elements.item = elements.collage.find(options.item);
      elements.img = elements.collage.find(options.img);

      this.cleanup();

      var imgs;

      if (options.preload) {
        imgs = elements.img.filter(function(){
          if (!$.data(this, "error")) {
            return this;
          }
        });
      } else {
        imgs = elements.img;
      }

      if (imgs.length == 0) return;

      this.create(imgs);
    }
  };

  var methods = {
    init : function(options){
      return this.each(function(){
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    },

    update: function(){
      return this.each(function(){
        var data = $.data(this, "plugin_" + pluginName);

        if (!data) {
          $.error(pluginName + " wasn't initialized");
          return;
        }

        data.update();
      });
    },

    destroy: function(){
      return this.each(function(){
        var data = $.data(this, "plugin_" + pluginName);

        if (!data) {
          $.error(pluginName + " wasn't initialized");
          return;
        }

        data.cleanup();
        $(this).removeData("plugin_" + pluginName);
      });
    }
  };

  function buildImgsData(data, cntWidth, margin, lastClass){
    if(data.length == 0) return data;
    var item,
      ratio,
      totalRatio = 0,
      i;
    for(i=0;i<data.length;i++){
      item = data[i];
      ratio = item.width/item.height;
      item.ratio = ratio;
      totalRatio += ratio;
    }
    var iterator = [data, 0];
    if(data.length == 1){
      item = data[0];
      item._width = Math.min(item.width, cntWidth);
      item._height = Math.round(item._width / item.ratio);
    } else if(totalRatio >= FIRST_ROW_RATIO + NEXT_ROWS_RATIO || data.length == 2) {
      buildRows(data, cntWidth, margin, lastClass);
    } else if(data[0].ratio > 1){
      data.type = "rows";
      var rows = [];
      rows.push(getRow(iterator, data[0].ratio));
      pushNextRows(rows, iterator, cntWidth, margin, lastClass);
    } else {
      data.type = "big";
      var bigItem = data[0],
        vertSumRatio = 0,
        vertMargin = (data.length - 2) * margin,
        rowWidth = cntWidth - margin - 1,
        rowHeight,
        vertWidth,
        totalVertHeight = 0;
      for(i=1; i<data.length; i++){
        item = data[i];
        vertSumRatio += 1 / item.ratio;
      }
      vertWidth = Math.round((rowWidth  - bigItem.ratio * vertMargin) / (1 + bigItem.ratio * vertSumRatio));
      rowHeight = Math.round((rowWidth - vertWidth) / bigItem.ratio);
      if(vertWidth < 0.2 * rowWidth){
        buildRows(data, cntWidth, margin, lastClass);
      } else {
        for(i=0; i<data.length; i++){
          item = data[i];
          if(i==0){
            item._width = rowWidth - vertWidth;
            item._height = rowHeight;
          } else {
            item._width = vertWidth;
            item._height = Math.round(vertWidth / item.ratio);
            totalVertHeight += item._height;
          }
        }
        data[0]._width += rowWidth - data[0]._width - vertWidth;
        item = data[data.length - 1];
        item._height += rowHeight - totalVertHeight - (data.length - 2) * margin;
      }
    }

    return data;
  }

  function buildRows(data, cntWidth, margin, lastClass){
    var rows = [],
      iterator = [data, 0];
    rows.push(getRow(iterator, FIRST_ROW_RATIO));
    pushNextRows(rows, iterator, cntWidth, margin, lastClass);
    data.type = "rows";
  }

  function pushNextRows(rows, iterator, cntWidth, margin, lastClass){
    var data = iterator[0],
      i = 0;

    while(iterator[1] < data.length) {
      rows.push(getRow(iterator, NEXT_ROWS_RATIO + (i++ % 2) * 0.5));
    }

    var lastRow = rows.pop();
    if(lastRow.volume < NEXT_ROWS_RATIO * 0.65) {
      if (rows.length == 0) {
        rows.push(lastRow);
      } else {
        var prevLastRow = rows[rows.length - 1];
        prevLastRow.ratio += lastRow.ratio;
        Array.prototype.push.apply(prevLastRow, lastRow);
      }
    } else {
      rows.push(lastRow);
    }
    var rowWidth,
      rowHeight,
      rowTotalWidth,
      row,
      ii,
      item;
    for(i=0;i<rows.length;i++){
      row = rows[i];
      rowWidth = cntWidth - margin * (row.length - 1) - 1;
      rowHeight = Math.round(rowWidth / row.ratio);
      rowTotalWidth = 0;
      for(ii=0;ii<row.length;ii++){
        item = row[ii];
        if(ii == row.length - 1){
          item.mod = lastClass;
        } else {
          //delete item.mod;
          item.mod = undefined;
          try{
              delete item.mod;
          }catch(e){}
        }
        item._height = rowHeight;
        item._width = Math.round(rowHeight * item.ratio);
        rowTotalWidth += item._width;
      }
      item = row[row.length - 1];
      item._width += rowWidth - rowTotalWidth;
    }
  }

  function getRow(iterator, maxRatio){
    var row = [],
      item;
    row.ratio = 0;
    row.volume = 0;
    while(row.volume < maxRatio){
      item = iterator[0][iterator[1]++];
      if(!item) break;
      row.push(item);
      row.ratio += item.ratio;
      row.volume += Math.max(item.ratio, 1 / item.ratio);
    }
    if(row.volume - maxRatio > 0.15 * maxRatio && row.length != 1) {
      var lastItem = row.pop();
      row.ratio -= lastItem.ratio;
      row.volume -= Math.max(lastItem.ratio, 1 / lastItem.ratio);
      iterator[1]--;
    }
    return row;
  }

  $.fn[pluginName] = function(method){
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("This method is not define");
    };
  };
})(jQuery, window, document);
