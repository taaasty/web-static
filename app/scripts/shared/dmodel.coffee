class window.DModel
  _.extend @prototype, Backbone.Events

  constructor: (object={}) ->
    @set object

  set: (object) ->
    _.extend @, object

