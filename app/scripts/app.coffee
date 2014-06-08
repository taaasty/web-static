Routers = require './react_components/routers'

App = 
  start: ->
    React.renderComponent new Routers, document.getElementById('routers')

module.exports = App
