(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./mobile/bundle');



},{"./mobile/bundle":2}],2:[function(require,module,exports){
require('./resources/libs');

require('./resources/tasty');

require('./react/application');



},{"./react/application":3,"./resources/libs":4,"./resources/tasty":5}],3:[function(require,module,exports){
var ReactApp;

ReactApp = {
  start: function(_arg) {
    var user;
    user = _arg.user;
    return console.log('ReactApp start');
  }
};

window.ReactApp = ReactApp;



},{}],4:[function(require,module,exports){




},{}],5:[function(require,module,exports){
window.Tasty = {
  start: function(_arg) {
    var flashes, user;
    user = _arg.user, flashes = _arg.flashes;
    return ReactApp.start({
      user: user
    });
  }
};



},{}]},{},[1]);
