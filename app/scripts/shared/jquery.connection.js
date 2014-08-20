/**
 * jQuery Connection
*/
;(function($, window, document, undefined) {
  var pluginName = 'connection',
    defaults = {
      connectionEnd: '.connection-end',
      connectionLineClass: 'connection-line',
      indent: 30
    };

  function Connection(element, options) {
    this.$start = $(element);

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Connection.prototype = {
    $win: null,
    $start: null,
    $end: null,
    $line: null,
    $lineFill: null,

    id: null,

    init: function() {
      var settings = this.options,
        connectionEnd = settings.connectionEnd;

      this.$win = $(window);
      this.id = this.$start.data('connection-id');
      this.$end = $(connectionEnd).filter('[data-connection-id="' + this.id + '"]');

      this.createConnection();

      this.resize();
      this.events();
    },

    events: function() {
      var self = this;

      $(window)
        .on('resize', function() {self.resize();})
        .on('load', function() {self.resize();});
    },

    resize: function() {
      var settings = this.options,
        $start = this.$start,
        $end = this.$end,
        indent = settings.indent;

      var posStart = this.getCenterPosition($start),
        posEnd = this.getCenterPosition($end);

      var legs = this.calculateLegs(posStart, posEnd),
        hypotenuse = this.calculateHypotenuse(legs),
        degree = this.calculateDegree(legs[0], hypotenuse);

      degree = (posStart.left > posEnd.left ? 180 - degree : degree);
      degree = (posStart.top > posEnd.top ? -degree : degree);

      var factors = this.getFactorsLine(posStart, posEnd);

      var coordsStart = this.getCoordinatesNode($start),
        coordsEnd = this.getCoordinatesNode($end);

      var intStart = this.getIntersection(factors, coordsStart, posStart, posEnd),
        intEnd = this.getIntersection(factors, coordsEnd, posStart, posEnd);

      this.$lineFill.css({
        left: Math.round(Math.abs(posStart.left - intStart[1])) + settings.indent,
        right: Math.round(Math.abs(posEnd.left - intEnd[1])) + settings.indent
      });

      this.$line.css({
        'width': hypotenuse,
        'top': posStart.top,
        'left': posStart.left,
        '-webkit-transform': 'rotate(' + degree + 'deg)',
        '-moz-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)'
      });
    },

    createConnection: function() {
      var settings = this.options,
        connectionLineClass = settings.connectionLineClass

      this.$lineFill = $('<div />', {'class': connectionLineClass + '-i'});
      this.$line = $('<div />', {'class': connectionLineClass});

      this.$start.after(this.$line.html(this.$lineFill));
    },

    getCoordinatesNode: function(element) {
      var offset = element.offset(),
        x1 = Math.round(offset.left),
        y1 = Math.round(offset.top);

      var widthWindow = this.$win.width();

      x1 = x1 - Math.floor(x1 / widthWindow) * widthWindow;

      var x2 = Math.round(x1 + element.outerWidth()),
        y2 = Math.round(y1 + element.outerHeight());

      var A = {
          'start': [y1, x1],
          'end': [y1, x2]
        },

        B = {
          'start': [y1, x2],
          'end': [y2, x2]
        },

        C = {
          'start': [y2, x1],
          'end': [y2, x2]
        },

        D = {
          'start': [y1, x1],
          'end': [y2, x1]
        };

      /* A - top side, B - right side, C - bottom side, D - left side */
      return [A, B, C, D]; // [y, x]
    },

    getCenterPosition: function(element) {
      var offset = element.offset(),
        x = offset.left,
        y = offset.top;

      x = Math.round(x + (element.outerWidth() / 2));
      y = Math.round(y + (element.outerHeight() / 2));

      var widthWindow = this.$win.width();

      x = x - Math.floor(x / widthWindow) * widthWindow;

      return {'top': y, 'left': x};
    },

    calculateHypotenuse: function(legs) {
      return Math.round(Math.sqrt(legs[0] * legs[0] + legs[1] * legs[1]));
    },

    calculateLegs: function(start, end) {
      var a = Math.round(Math.abs(start.top - end.top)),
        b = Math.round(Math.abs(start.left - end.left));

      return [a, b]; // [y, x]
    },

    calculateDegree: function(c, h){
      return Math.round(Math.asin(c / h) * 180 / Math.PI);
    },

    getFactorsLine: function(start, end) {
      var k, b;

      k = (end.top - start.top) / (end.left - start.left);
      b = start.top - start.left * k;

      return {'k': k, 'b': b}; //'y = ' + k + ' * x + ' + b;
    },

    // factors - коэффициенты k и b
    // coords - координаты всех сторон прямоуголника
    getIntersection: function(factors, coords, start, end) {
      var x, y, xI, yI;

      for (var i = 0, count = coords.length; i < count; i++) {
        // Находим пересечение текущей стороны
        if (coords[i].start[0] == coords[i].end[0]) {
          y = coords[i].start[0];
          x = ( y - factors.b ) / factors.k;

          // Отбрасываем x, который выходит за область пересечения
          if (coords[i].start[1] <= x && coords[i].end[1] >= x) {
            if ((start.left <= x && end.left >= x) ||
            (start.left >= x && end.left <= x)) {
              xI = x;
              yI = y;
            }
          }
        } else if (coords[i].start[1] == coords[i].end[1]) {
          x = coords[i].start[1];
          y = factors.k * x + factors.b;

          // Отбрасываем y, который выходит за область пересечения
          if (coords[i].start[0] <= y && coords[i].end[0] >= y) {
            if ((start.top <= y && end.top >= y) ||
            (start.top >= y && end.top <= y)) {
              yI = y;
              xI = x;
            }
          }
        }
      }

      return [Math.round(yI), Math.round(xI)];
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
        new Connection(this, options));
      }
    });
  };
})(jQuery, window, document);