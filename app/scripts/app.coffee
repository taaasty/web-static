Routers = require './react_components/routers'

App = 
  start: ->
    routers_element = document.getElementById('routers')
    React.renderComponent new Routers, routers_element if routers_element?

module.exports = App
