var NeatComponent;

NeatComponent = React.createClass({
  render: function() {
    var n;
    return React.createElement(React.DOM.div, {
      "className": "neat-component"
    }, (this.props.showTitle ? React.createElement(React.DOM.h1, null, "A Component is I") : void 0), React.createElement(React.DOM.hr, null), (function() {
      var _i, _results;
      _results = [];
      for (n = _i = 1; _i <= 10; n = ++_i) {
        _results.push(React.createElement(React.DOM.p, null, "This line has been printed ", n, " times"));
      }
      return _results;
    })());
  }
});
