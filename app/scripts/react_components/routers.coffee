###* @jsx React.DOM ###

RRC = require 'react-router-component'

MainPage = React.createClass
  render: -> return `<h2>MainPage</h2>`

UserPage = React.createClass
  render: -> return `<h2>UserPage</h2>`

NotFoundPage = React.createClass
  render: -> return `<h2>Not found</h2>`

Routers = React.createClass
  render: ->
    RRC.Locations null,
      RRC.Location( path: "/", handler: MainPage ),
      RRC.Location( path: "/#a", handler: UserPage ),
      RRC.NotFound( handler: NotFoundPage)

module.exports = Routers
