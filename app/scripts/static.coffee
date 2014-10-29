window.$ = window.jQuery = require 'jquery'
require 'jquery.connection'

$('.js-connection-start').connection {
  connectionEnd: '.js-connection-end'
  connectionLineClass: 'connection-line'
}